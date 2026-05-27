import { Clock, MapPin, Users, Tag, ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';
import { timeAgo, getVerdictColor } from '../utils/helpers.js';

export default function ScamFeedCard({ report }) {
  if (!report) return null;

  const {
    verdict,
    inputType = 'Text',
    inputContent,
    reasonHindi,
    reasonEnglish,
    redFlags = [],
    confidence,
    reportCount = 1,
    city = 'Mumbai',
    createdAt,
  } = report;

  const colorHexMap = {
    'SCAM': 'text-red-600 border-red-200 bg-red-50/50',
    'SUSPICIOUS': 'text-yellow-600 border-yellow-200 bg-yellow-50/50',
    'SAFE': 'text-green-600 border-green-200 bg-green-50/50',
  };

  const badgeStyles = colorHexMap[verdict?.toUpperCase()] || 'text-gray-600 border-gray-200 bg-gray-50';

  // Badge verdict styles
  const getVerdictBadge = (v) => {
    const caps = (v || '').toUpperCase();
    if (caps === 'SCAM') {
      return (
        <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          <ShieldAlert className="h-3.5 w-3.5" />
          SCAM
        </span>
      );
    } else if (caps === 'SUSPICIOUS') {
      return (
        <span className="inline-flex items-center gap-1 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          <AlertTriangle className="h-3.5 w-3.5" />
          SUSPICIOUS
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          SAFE
        </span>
      );
    }
  };

  // Text color mapper for confidence score
  const getConfidenceColor = (v) => {
    const caps = (v || '').toUpperCase();
    if (caps === 'SCAM') return 'text-red-600';
    if (caps === 'SUSPICIOUS') return 'text-yellow-500';
    return 'text-green-600';
  };

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between gap-6">
      
      {/* Left Block: Content & analysis summary */}
      <div className="flex-1 space-y-4">
        {/* Topic Bar: Badge + Type Header */}
        <div className="flex flex-wrap items-center gap-2.5">
          {getVerdictBadge(verdict)}
          
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md">
            <Tag className="h-3 w-3" />
            {inputType || 'Bank Fraud'}
          </span>
        </div>

        {/* Highlight content Quote Box */}
        {inputContent && (
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 font-mono text-xs text-gray-600 leading-relaxed break-all">
            "{inputContent}"
          </div>
        )}

        {/* Quick localized reason text */}
        <div className="space-y-1">
          {reasonHindi && (
            <p className="text-gray-900 font-semibold text-base leading-relaxed">
              "{reasonHindi}"
            </p>
          )}
          {reasonEnglish && (
            <p className="text-gray-500 text-xs leading-relaxed">
              {reasonEnglish}
            </p>
          )}
        </div>

        {/* Display associated Red flags chips if any */}
        {redFlags && redFlags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {redFlags.map((flag, idx) => (
              <span key={idx} className="bg-red-50 text-red-700 border border-red-50 text-[10px] font-medium px-2 py-0.5 rounded-full">
                {flag}
              </span>
            ))}
          </div>
        )}

        {/* Meta Row info details */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-gray-50 pt-3.5 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            {timeAgo(createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-gray-400" />
            {city}
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <Users className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <strong className="text-gray-700 font-bold">{reportCount}</strong> logon ne report kiya
          </span>
        </div>
      </div>

      {/* Right Block: Large confidence score */}
      <div className="md:w-32 flex md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AI Score</span>
        <span className={`text-3xl font-black ${getConfidenceColor(verdict)} tracking-tight mt-1`}>
          {confidence}%
        </span>
        <span className="text-[10px] text-gray-400 font-medium hidden md:block">confidence level</span>
      </div>

    </article>
  );
}
