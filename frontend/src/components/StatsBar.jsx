import { useEffect } from 'react';
import { Shield, ShieldAlert, Heart } from 'lucide-react';
import useReport from '../hooks/useReport.js';

function formatCount(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M+';
  if (num >= 1_000)     return (num / 1_000).toFixed(1)     + 'K+';
  return String(num);
}

export default function StatsBar() {
  const { fetchStatsHook, stats, statsLoading } = useReport();

  useEffect(() => {
    fetchStatsHook();
  }, [fetchStatsHook]);

  // Fallback while loading or if API fails
  const totalScans  = stats ? formatCount(stats.totalScans)  : '—';
  const scamsFound  = stats ? formatCount(stats.scamsFound)  : '—';
  const peopleSaved = stats ? formatCount(stats.peopleSaved) : '—';

  const cardClass =
    'bg-blue-50/50 rounded-xl p-6 text-center flex flex-col items-center border border-blue-50/50 shadow-sm hover:translate-y-[-2px] transition duration-200';
  const iconClass =
    'h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-inner';
  const valueClass = `text-3xl font-extrabold text-gray-900 tracking-tight ${statsLoading ? 'animate-pulse text-gray-300' : ''}`;

  return (
    <div id="stats-dashboard-bar" className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">

      {/* Total Scans */}
      <div className={cardClass}>
        <div className={iconClass}>
          <Shield className="h-5 w-5" />
        </div>
        <p className={valueClass}>{totalScans}</p>
        <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">Total Scans</p>
      </div>

      {/* Scams Detected */}
      <div className={cardClass}>
        <div className={iconClass}>
          <ShieldAlert className="h-5 w-5" />
        </div>
        <p className={valueClass}>{scamsFound}</p>
        <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">Scams Detected</p>
      </div>

      {/* People Protected */}
      <div className={cardClass}>
        <div className={iconClass}>
          <Heart className="h-5 w-5 animate-pulse" />
        </div>
        <p className={valueClass}>{peopleSaved}</p>
        <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">People Protected</p>
      </div>

    </div>
  );
}
