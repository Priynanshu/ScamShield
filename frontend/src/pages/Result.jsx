import { useLocation, Link, useParams } from 'react-router-dom';
import { ChevronLeft, Share2, Check } from 'lucide-react';
import ResultCard from '../components/ResultCard.jsx';
import useScan from '../hooks/useScan.js';
import { useEffect, useState } from 'react';

export default function Result() {
  const location = useLocation();
  const { aiResult: rawScanResponse } = useScan();
  const [copied, setCopied] = useState(false);

  const extractCleanData = (source) => {
    if (!source) return null;
    const target = source.aiResult ? source.aiResult : source;
    return {
      scamId:        target._id,
      verdict:       target.verdict,
      confidence:    target.confidence,
      inputType:     target.inputType || source.inputType || 'Text',
      inputContent:  target.scamMessage || target.inputContent || '',
      scamMessage:   target.scamMessage || '',
      reasonHindi:   target.reasonHindi,
      reasonEnglish: target.reasonEnglish,
      redFlags:      target.redFlags || [],
      language:      target.language || 'English',
    };
  };

  const [resultData, setResultData] = useState(() => {
    if (location.state?.result) return extractCleanData(location.state.result);
    const saved = localStorage.getItem('latest_scan_result');
    if (saved) { try { return JSON.parse(saved); } catch { return null; } }
    if (rawScanResponse) return extractCleanData(rawScanResponse);
    return null;
  });

  useEffect(() => {
    const src = location.state?.result || rawScanResponse;
    if (src) {
      const normalized = extractCleanData(src);
      if (normalized?.verdict) {
        setResultData(normalized);
        localStorage.setItem('latest_scan_result', JSON.stringify(normalized));
      }
    }
  }, [rawScanResponse, location.state]);

  // Share link — copy current page URL to clipboard
  const handleShareLink = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-slate-50/20 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">

        {/* Top navigation bar */}
        <div className="w-full max-w-2xl flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Share button */}
          {resultData && (
            <button
              onClick={handleShareLink}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-300 rounded-lg px-3 py-1.5 transition cursor-pointer"
              title="Copy result link"
            >
              {copied
                ? <><Check className="h-3.5 w-3.5 text-green-600" /><span className="text-green-600">Copied!</span></>
                : <><Share2 className="h-3.5 w-3.5" />Share Result</>
              }
            </button>
          )}
        </div>

        {/* Result Card */}
        <div className="w-full flex justify-center">
          {resultData ? (
            <ResultCard result={resultData} />
          ) : (
            <div className="text-center p-8 bg-white border rounded-xl max-w-2xl w-full shadow-sm text-gray-500 text-sm space-y-4">
              <p>No scan data found. Go back and perform a new scan.</p>
              <Link to="/" className="inline-block text-blue-600 font-semibold hover:underline text-sm">
               For Scan Click here →
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
