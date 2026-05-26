// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ShieldAlert, AlertTriangle, ShieldCheck, Share2, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
// import { reportScam } from '../services/api.js';

// export default function ResultCard({ result }) {
//   const navigate = useNavigate();
//   const [reporting, setReporting] = useState(false);
//   const [reportSuccess, setReportSuccess] = useState(false);
//   const [reportError, setReportError] = useState(null);

//   if (!result) return null;

//   const { verdict, confidence, reasonHindi, reasonEnglish, redFlags = [], inputContent, inputType } = result;

//   const handleReport = async () => {
//     setReporting(true);
//     setReportError(null);
//     const { data, error } = await reportScam({
//       verdict,
//       confidence,
//       reasonHindi,
//       reasonEnglish,
//       redFlags,
//       inputType: inputType || 'Text',
//       inputContent: inputContent || 'User scanned query content',
//       city: 'Delhi', // Default city
//     });

//     setReporting(false);
//     if (error) {
//       setReportError(error);
//     } else {
//       setReportSuccess(true);
//       // Wait shortly then navigate to community feed
//       setTimeout(() => {
//         navigate('/community');
//       }, 1500);
//     }
//   };

//   const handleScanAgain = () => {
//     navigate('/');
//   };

//   // Verdict style mapper
//   const getVerdictStyles = (v) => {
//     const caps = (v || '').toUpperCase();
//     if (caps === 'SCAM') {
//       return {
//         bg: 'bg-red-50 border-red-100 text-red-600',
//         badge: 'bg-red-600 text-white',
//         icon: <ShieldAlert className="h-8 w-8 text-red-600" />,
//         label: 'SCAM DETECTED',
//         desc: 'Our analysis suggests this content is highly fraudulent.'
//       };
//     } else if (caps === 'SUSPICIOUS') {
//       return {
//         bg: 'bg-yellow-50 border-yellow-100 text-yellow-600',
//         badge: 'bg-yellow-500 text-white',
//         icon: <AlertTriangle className="h-8 w-8 text-yellow-600" />,
//         label: 'SUSPICIOUS CONTENT',
//         desc: 'Caution advised. This content shows some red flags.'
//       };
//     } else {
//       return {
//         bg: 'bg-green-50 border-green-100 text-green-600',
//         badge: 'bg-green-600 text-white',
//         icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
//         label: 'SAFE CONTENT',
//         desc: 'No clear indicators of fraud found.'
//       };
//     }
//   };

//   const styles = getVerdictStyles(verdict);

//   return (
//     <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 space-y-6">
      
//       {/* Top Banner Verdict */}
//       <div className="flex flex-col items-center text-center space-y-4">
//         <div className={`p-4 rounded-full bg-opacity-25 ${styles.bg}`}>
//           {styles.icon}
//         </div>
//         <div className="space-y-1">
//           <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold tracking-wider ${styles.badge}`}>
//             {verdict?.toUpperCase() || 'UNKNOWN'}
//           </span>
//           <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-2">{styles.label}</h2>
//           <p className="text-sm text-gray-500">{styles.desc}</p>
//         </div>
//       </div>

//       <hr className="border-gray-100" />

//       {/* Confidence Score Bar */}
//       <div className="space-y-2">
//         <div className="flex justify-between items-end">
//           <span className="text-sm font-semibold text-gray-700">AI Confidence Score</span>
//           <span className="text-lg font-bold text-blue-600">{confidence || 0}%</span>
//         </div>
//         <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
//           <div 
//             className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out" 
//             style={{ width: `${confidence || 0}%` }}
//           />
//         </div>
//       </div>

//       {/* Scanned query excerpt if present */}
//       {inputContent && (
//         <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 font-mono text-xs text-gray-500 break-all max-h-24 overflow-y-auto">
//           <span className="font-semibold text-gray-700 block mb-1">Scanned Item Content:</span>
//           "{inputContent}"
//         </div>
//       )}

//       {/* Localized Reason Boxes */}
//       <div className="space-y-4 bg-blue-50/40 p-5 rounded-lg border border-blue-50">
//         <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest">AI Analysis</h3>
        
//         <div className="space-y-2">
//           {reasonHindi && (
//             <p className="text-gray-900 font-semibold text-base leading-relaxed">
//               "{reasonHindi}"
//             </p>
//           )}
//           {reasonEnglish && (
//             <p className="text-gray-500 text-sm leading-relaxed">
//               {reasonEnglish}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Red Flags Chips */}
//       {redFlags && redFlags.length > 0 && (
//         <div className="space-y-2">
//           <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Detected Red Flags</h4>
//           <div className="flex flex-wrap gap-2">
//             {redFlags.map((flag, index) => (
//               <span 
//                 key={index} 
//                 className="bg-red-50 text-red-700 border border-red-100 font-medium px-3 py-1 rounded-full text-xs"
//               >
//                 {flag}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Feedback Message Block */}
//       {reportSuccess && (
//         <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 border border-green-100 rounded-lg text-sm">
//           <CheckCircle className="h-4 w-4 shrink-0" />
//           <span>Report successfully submitt kiya! Community feed pe chalte hain...</span>
//         </div>
//       )}
//       {reportError && (
//         <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm">
//           <AlertCircle className="h-4 w-4 shrink-0" />
//           <span>{reportError}</span>
//         </div>
//       )}

//       {/* Actions Button Row */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
//         <button
//           type="button"
//           onClick={handleReport}
//           disabled={reporting || reportSuccess}
//           className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-lg font-semibold text-sm transition shadow-sm cursor-pointer ${
//             reportSuccess
//               ? 'bg-green-600 text-white cursor-default'
//               : 'bg-blue-600 text-white hover:bg-blue-700'
//           }`}
//         >
//           <Share2 className="h-4 w-4" />
//           {reporting ? 'Uploading...' : reportSuccess ? 'Reported ✓' : 'Report to Community'}
//         </button>
//         <button
//           type="button"
//           onClick={handleScanAgain}
//           className="flex-1 flex items-center justify-center gap-2 py-3 px-5 border border-blue-600 text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-50 transition cursor-pointer"
//         >
//           <RefreshCw className="h-4 w-4" />
//           Scan Again
//         </button>
//       </div>

//     </div>
//   );
// }
