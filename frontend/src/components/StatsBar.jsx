// import { Shield, ShieldAlert, Heart } from 'lucide-react';

// export default function StatsBar({ 
//   totalScans = '2.5M+', 
//   scamsFound = '450K+', 
//   peopleSaved = '1.2M+' 
// }) {
//   return (
//     <div id="stats-dashboard-bar" className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
      
//       {/* Stat Card 1: Total Scans */}
//       <div className="bg-blue-50/50 rounded-xl p-6 text-center flex flex-col items-center border border-blue-50/50 shadow-sm hover:translate-y-[-2px] transition duration-200">
//         <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-inner">
//           <Shield className="h-5 w-5" />
//         </div>
//         <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{totalScans}</p>
//         <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">Total Scans</p>
//       </div>

//       {/* Stat Card 2: Scams Detected */}
//       <div className="bg-blue-50/50 rounded-xl p-6 text-center flex flex-col items-center border border-blue-50/50 shadow-sm hover:translate-y-[-2px] transition duration-200">
//         <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-inner">
//           <ShieldAlert className="h-5 w-5" />
//         </div>
//         <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{scamsFound}</p>
//         <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">Scams Detected</p>
//       </div>

//       {/* Stat Card 3: Saved Citizens */}
//       <div className="bg-blue-50/50 rounded-xl p-6 text-center flex flex-col items-center border border-blue-50/50 shadow-sm hover:translate-y-[-2px] transition duration-200">
//         <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3 shadow-inner">
//           <Heart className="h-5 w-5 animate-pulse" />
//         </div>
//         <p className="text-3xl font-extrabold text-gray-900 tracking-tight">{peopleSaved}</p>
//         <p className="text-sm font-semibold text-gray-500 mt-1 uppercase tracking-wider">People Protected</p>
//       </div>

//     </div>
//   );
// }
