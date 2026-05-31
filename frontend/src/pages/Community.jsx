import { useState, useEffect, useCallback } from 'react';
import { Search, AlertTriangle, ShieldCheck, Loader2, RefreshCw } from 'lucide-react';
import ScamFeedCard from '../components/ScamFeedCard.jsx';
import useReport from '../hooks/useReport.js';
import StatsBar from '../components/StatsBar.jsx';

export default function Community() {
  const [activeFilter, setActiveFilter] = useState('Sabse Naye');
  const [searchQuery, setSearchQuery] = useState('');
  const { allReportedMessages, reportLoading, reportError, fetchAllReportsMessagesHook } = useReport();

  const loadReports = useCallback(() => {
    fetchAllReportsMessagesHook();
  }, [fetchAllReportsMessagesHook]);

  useEffect(() => {
    // Always fetch fresh on mount — don't rely on stale Redux cache
    loadReports();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const reportsSource = allReportedMessages || [];


  const filteredByTab = reportsSource.filter((report) => {
    if (!report) return false;
    const caps = report.verdict?.toUpperCase();
    if (activeFilter === 'Scams')      return caps === 'SCAM';
    if (activeFilter === 'Suspicious') return caps === 'SUSPICIOUS';
    return true;
  });

  const filteredReports = filteredByTab.filter((report) => {
    if (!searchQuery.trim()) return true;
    const s = searchQuery.toLowerCase();
    const content   = (report.scamMessage || '').toLowerCase();
    const reason    = (report.reasonHindi || report.reasonEnglish || '').toLowerCase();
    const loc       = (report.location || '').toLowerCase();
    const type      = (report.inputType || '').toLowerCase();
    const category  = (report.category || '').toLowerCase();
    return content.includes(s) || reason.includes(s) || loc.includes(s) || type.includes(s) || category.includes(s);
  });

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        <StatsBar />

        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Community Scam Feed</h1>
          <p className="text-sm text-gray-500 max-w-xl">
            A Global List of New Scams Reported by Indian Citizens. Read, Learn, and Stay Alert!
          </p>
        </div>

        {/* Filter + Search Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex bg-gray-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
            {['Sabse Naye', 'Scams', 'Others'].map((filterName) => (
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

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-xs bg-white text-gray-800 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="h-4 w-4" />
              </div>
            </div>
            {/* Manual refresh */}
            <button
              onClick={loadReports}
              disabled={reportLoading}
              title="Refresh community feed"
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 transition cursor-pointer disabled:opacity-40"
            >
              <RefreshCw className={`h-4 w-4 ${reportLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content area */}
        {reportLoading && reportsSource.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-2">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <p className="text-xs text-gray-500 font-medium">Loading community database...</p>
          </div>
        ) : reportError && reportsSource.length === 0 ? (
          <div className="text-center p-12 bg-red-50 text-red-700 border border-red-100 rounded-xl space-y-3">
            <AlertTriangle className="h-10 w-10 text-red-600 mx-auto" />
            <p className="font-semibold">{reportError}</p>
            <button
              onClick={loadReports}
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center p-16 border border-dashed border-gray-200 rounded-xl space-y-4 bg-gray-50/20">
            <ShieldCheck className="h-12 w-12 text-blue-600 mx-auto stroke-1" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">
                {reportsSource.length === 0 ? 'No reports available yet' : 'No matching reports found!'}
              </h3>
              <p className="text-xs text-gray-500">
                {reportsSource.length === 0
                  ? 'Be the first to report a scam!'
                  : 'No results found for this filter and query.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Subtle loading overlay during refresh */}
            {reportLoading && (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Refreshing...
              </div>
            )}
            {filteredReports.map((report, idx) => (
              <ScamFeedCard key={report._id || idx} report={report} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
