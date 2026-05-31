import { useState } from 'react';
import { Clock, MapPin, Users, Tag, ShieldAlert, AlertTriangle, ShieldCheck, ThumbsUp, ThumbsDown } from 'lucide-react';
import { timeAgo } from '../utils/helpers.js';
import useReport from '../hooks/useReport.js';

export default function ScamFeedCard({ report }) {
  if (!report) return null;

  const {
    _id,
    verdict,
    inputType = 'Text',
    category,
    scamMessage,
    reasonHindi,
    reasonEnglish,
    redFlags = [],
    confidence = 0,
    location = 'Mumbai',
    relatableCount = 0,
    createdAt,
  } = report;

  const { markRelatableHook } = useReport();

  // Separate optimistic state for relatable so cards are independent
  const [localCount, setLocalCount] = useState(relatableCount);
  const [hasRelated, setHasRelated] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleRelatable = async () => {
    if (busy || hasRelated) return; // Prevent multiple clicks if already related

    // Toggle ON — call backend
    setBusy(true);
    setHasRelated(true);
    setLocalCount((c) => c + 1); // optimistic
    try {
      const res = await markRelatableHook(_id);
      if (res?.payload?.scamMessage?.relatableCount !== undefined) {
        // Sync with actual DB value
        setLocalCount(res.payload.scamMessage.relatableCount);
      }
    } catch {
      // Revert on failure
      setHasRelated(false);
      setLocalCount((c) => Math.max(0, c - 1));
    } finally {
      setBusy(false);
    }
  };

  const getVerdictBadge = (v) => {
    const caps = (v || '').toUpperCase();
    if (caps === 'SCAM') return (
      <span className="inline-flex items-center gap-1 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
        <ShieldAlert className="h-3.5 w-3.5" /> SCAM
      </span>
    );
    if (caps === 'SUSPICIOUS') return (
      <span className="inline-flex items-center gap-1 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
        <AlertTriangle className="h-3.5 w-3.5" /> SUSPICIOUS
      </span>
    );
    return (
      <span className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
        <ShieldCheck className="h-3.5 w-3.5" /> SAFE
      </span>
    );
  };

  const confidenceColor =
    (verdict || '').toUpperCase() === 'SCAM'       ? 'text-red-600'    :
    (verdict || '').toUpperCase() === 'SUSPICIOUS'  ? 'text-yellow-500' :
    'text-green-600';

  return (
    <article className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between gap-6">

      <div className="flex-1 space-y-4">

        {/* Verdict + Category badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          {getVerdictBadge(verdict)}
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md">
            <Tag className="h-3 w-3" />
            {category || inputType}
          </span>
        </div>

        {/* Message preview */}
        {scamMessage && (
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 font-mono text-xs text-gray-600 leading-relaxed break-all line-clamp-3">
            "{scamMessage}"
          </div>
        )}

        {/* AI Reason */}
        {(reasonHindi || reasonEnglish) && (
          <p className="text-gray-900 font-semibold text-base leading-relaxed">
            "{reasonHindi || reasonEnglish}"
          </p>
        )}

        {/* Red flags */}
        {redFlags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {redFlags.map((flag, idx) => (
              <span key={idx} className="bg-red-50 text-red-700 border border-red-50 text-[10px] font-medium px-2 py-0.5 rounded-full">
                {flag}
              </span>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-50 pt-3.5 w-full">
          <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
            <Clock className="h-3.5 w-3.5" />
            {timeAgo(createdAt)}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
            <Users className="h-3.5 w-3.5 text-blue-500 shrink-0" />
            <strong className="text-gray-700 font-bold">{localCount}</strong>&nbsp;reported
          </span>

          {/* ── Find Relatable button disappears after successful click ── */}
          {!hasRelated ? (
            <button
              onClick={handleRelatable}
              disabled={busy}
              title="Mujhe bhi aisa message aaya tha"
              className={`ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all active:scale-95 bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-400 ${
                busy ? 'opacity-60 cursor-wait' : 'cursor-pointer'
              }`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              Find Relatable
            </button>
          ) : (
            // Layout/UI design maintain karne ke liye empty div leftover space consume karega
            <div className="ml-auto"></div>
          )}
        </div>
      </div>

      {/* AI Score sidebar */}
      <div className="md:w-32 flex md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">AI Score</span>
        <span className={`text-3xl font-black ${confidenceColor} tracking-tight mt-1`}>
          {confidence}%
        </span>
        <span className="text-[10px] text-gray-400 font-medium hidden md:block">confidence</span>
      </div>

    </article>
  );
}