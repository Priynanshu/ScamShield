import { useLocation, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ResultCard from '../components/ResultCard.jsx';
import useScan from '../hooks/useScan.js';
import { useEffect, useState } from 'react';

export default function Result() {
  const location = useLocation();
  
  // Naming overlap se bachne ke liye hook ke result ko rawScanResponse bolenge
  const { aiResult: rawScanResponse } = useScan();

  // Helper function: Yeh nested backend response ({ aiResult: { verdict... } }) ko cleanly extract karega
  const extractCleanData = (source) => {
    if (!source) return null;
    
    // Agar response ke andar 'aiResult' naam ki nested key hai, toh use target karo, nahi toh direct source use karo
    const target = source.aiResult ? source.aiResult : source;

    return {
      scamId: target._id,
      verdict: target.verdict,
      confidence: target.confidence,
      inputType: target.inputType || source.inputType || 'Text',
      inputContent: target.scamMessage || target.inputContent || '',
      reasonHindi: target.reasonHindi,
      reasonEnglish: target.reasonEnglish,
      redFlags: target.redFlags || [],
    };
  };

  // 1. Component state initialize karo safely
  const [resultData, setResultData] = useState(() => {
    // Priority A: Router state data (Live navigation)
    if (location.state?.result) {
      return extractCleanData(location.state.result);
    }

    // Priority B: LocalStorage backup (Safeguard for page reloads)
    const savedResult = localStorage.getItem('latest_scan_result');
    if (savedResult) return JSON.parse(savedResult);

    // Priority C: Redux state response
    if (rawScanResponse) {
      return extractCleanData(rawScanResponse);
    }

    return null;
  });

  // 2. Active scans ko track karne aur localStorage me sync rakhne ke liye useEffect
  useEffect(() => {
    const currentActiveSource = location.state?.result || rawScanResponse;

    if (currentActiveSource) {
      const normalizedData = extractCleanData(currentActiveSource);
      
      // Khali ya undefined states ko save hone se roko
      if (normalizedData && normalizedData.verdict !== undefined) {
        setResultData(normalizedData);
        localStorage.setItem('latest_scan_result', JSON.stringify(normalizedData));
      }
    }
  }, [rawScanResponse, location.state]);

  return (
    <div className="bg-slate-50/20 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
        
        {/* Navigation Indicator / Back Home Button */}
        <div className="w-full max-w-2xl flex justify-start">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition"
          >
            <ChevronLeft className="h-4 w-4" />
            Home pe wapas
          </Link>
        </div>

        {/* Dynamic Display of our verified client details */}
        <div className="w-full flex justify-center">
          {resultData ? (
            <ResultCard result={resultData} />
          ) : (
            <div className="text-center p-8 bg-white border rounded-xl max-w-2xl w-full shadow-sm text-gray-500 text-sm">
              No scan data found. Please go back home and run a fresh scan.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}