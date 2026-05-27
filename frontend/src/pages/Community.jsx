import { useState, useEffect } from 'react';
import { Search, AlertTriangle, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';
// import { getCommunityFeed } from '../services/api.js';
import ScamFeedCard from '../components/ScamFeedCard.jsx';
import useReport from '../hooks/useReport.js';

export default function Community() {
  const [activeFilter, setActiveFilter] = useState('Sabse Naye'); // 'Sabse Naye', 'Scams', 'Suspicious'
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(null);
  const {allReportedMessages} = useReport()
console.log(allReportedMessages)
  // Fetch reports on filter change
  const fetchReports = async () => {
    // setLoading(true);
    // setErrorCount(null);
    // const { data, error } = await getCommunityFeed(activeFilter);
    // if (error) {
    //   setErrorCount(error);
    // } else if (data) {
    //   setReports(data);
    // }
    // setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, [activeFilter]);

  // Client side search filtering based on search text input
  const filteredReports = reports.filter((report) => {
    if (!report) return false;
    const s = searchQuery.toLowerCase();
    const contentMatch = report.inputContent?.toLowerCase().includes(s) || false;
    const reasonHindiMatch = report.reasonHindi?.toLowerCase().includes(s) || false;
    const reasonEnglishMatch = report.reasonEnglish?.toLowerCase().includes(s) || false;
    const cityMatch = report.city?.toLowerCase().includes(s) || false;
    const typeMatch = report.inputType?.toLowerCase().includes(s) || false;
    
    return contentMatch || reasonHindiMatch || reasonEnglishMatch || cityMatch || typeMatch;
  });

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Head Header */}
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Community Scam Feed</h1>
          <p className="text-sm text-gray-500 max-w-xl">
            Bharat ke citizens dwara report kiye gaye naye scams ki global list. Padhhein, jaano aur sachet rahein!
          </p>
        </div>

        {/* Action Header Panel: Filter Category Tabs + Live Searchbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-100 pb-4">
          
          {/* Tag filters group */}
          <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
            {['Sabse Naye', 'Scams', 'Suspicious'].map((filterName) => (
              <button
                key={filterName}
                onClick={() => setActiveFilter(filterName)}
                className={`py-2 px-4 rounded-md text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeFilter === filterName
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filterName}
              </button>
            ))}
          </div>

          {/* Instant Search textbox */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Report search karein..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-xs bg-white text-gray-800 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="h-4 w-4" />
            </div>
          </div>

        </div>

        {/* Content list panel rendering */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-2">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <p className="text-xs text-gray-500 font-medium">Community database load ho raha hai...</p>
          </div>
        ) : errorCount ? (
          <div className="text-center p-12 bg-red-50 text-red-700 border border-red-100 rounded-xl space-y-3">
            <AlertTriangle className="h-10 w-10 text-red-600 mx-auto" />
            <p className="font-semibold">{errorCount}</p>
            <button
              onClick={fetchReports}
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              Phir se koshish karein
            </button>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center p-16 border border-dashed border-gray-200 rounded-xl space-y-4 bg-gray-50/20">
            <ShieldCheck className="h-12 w-12 text-blue-600 mx-auto stroke-1" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">Koi matching scam nahi mila!</h3>
              <p className="text-xs text-gray-500">Is filter aur query ke anusaar hum bilkul Safe hain.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report, idx) => (
              <ScamFeedCard key={report.id || idx} report={report} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
