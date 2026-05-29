import { Clock, MapPin, Users, Tag, ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';
import { timeAgo, getVerdictColor } from '../utils/helpers.js';

export default function ScamFeedCard({ report }) {
  if (!report) return null;

  const {
    verdict,
    inputType = 'Text',
    category,
    inputContent,
    scamMessage,
    reasonHindi,
    reasonEnglish,
    redFlags = [],
    confidence = 0,
    reportCount = 0,
    location = 'Mumbai',
    createdAt,
  } = report;

  const displayContent = inputContent || scamMessage;
  const displayReason = reasonHindi || reasonEnglish;
  const displayTag = category || inputType || 'Bank Fraud';

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

  const getConfidenceColor = (v) => {
    const caps = (v || '').toUpperCase();
    if (caps === 'SCAM') return 'text-red-600';
    if (caps === 'SUSPICIOUS') return 'text-yellow-500';
    return 'text-green-600';
  };

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between gap-6">
      
      <div className="flex-1 space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          {getVerdictBadge(verdict)}
          
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md">
            <Tag className="h-3 w-3" />
            {displayTag}
          </span>
        </div>

        {displayContent && (
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 font-mono text-xs text-gray-600 leading-relaxed break-all">
            "{displayContent}"
          </div>
        )}

        <div className="space-y-1">
          {displayReason && (
            <p className="text-gray-900 font-semibold text-base leading-relaxed">
              "{displayReason}"
            </p>
          )}
        </div>

        {redFlags && redFlags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {redFlags.map((flag, idx) => (
              <span key={idx} className="bg-red-50 text-red-700 border border-red-50 text-[10px] font-medium px-2 py-0.5 rounded-full">
                {flag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-gray-50 pt-3.5 text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            {timeAgo(createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-gray-400" />
            {location}
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <Users className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <strong className="text-gray-700 font-bold">{reportCount}</strong> logon ne report kiya
          </span>
        </div>
      </div>

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