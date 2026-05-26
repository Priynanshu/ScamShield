// import { useLocation, Link } from 'react-router-dom';
// import { ChevronLeft } from 'lucide-react';
// import ResultCard from '../components/ResultCard.jsx';

// // Realistic fallback result to prevent page crashes when accessed/refreshed directly
// const FALLBACK_SCAM_RESULT = {
//   verdict: 'SCAM',
//   confidence: 98,
//   inputType: 'Text',
//   inputContent: 'CONGRATULATIONS! Aapne Kaun Banega Crorepati (KBC) lottery worth ₹25,00,000 jeeti hai! Apni lottery claim karne ke liye turant call karein hamare officer ko +91 99345-23450 par... Jaldi karein!',
//   reasonHindi: 'KBC Lottery aur suspicious mobile and unknown WhatsApp numbers se aane wale message hamesha scam hote hain. Goverment ya KBC kabhi lottery pe registration fee nahi mangti.',
//   reasonEnglish: 'Classic pre-payment award fraud impersonating famous shows to solicit standard processing fees. Do not call this unknown number or share any OTPs.',
//   redFlags: ['Urgent Action Required', 'Unknown Call-to-Action Contact', 'Lottery Claim Tax Bait'],
// };

// export default function Result() {
//   const location = useLocation();
  
//   // Use state data if direct navigation occurred, otherwise load standard fallback
//   const resultData = location.state?.result || FALLBACK_SCAM_RESULT;

//   return (
//     <div className="bg-slate-50/20 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
        
//         {/* Navigation Indicator / Back Home Button */}
//         <div className="w-full max-w-2xl flex justify-start">
//           <Link 
//             to="/" 
//             className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition"
//           >
//             <ChevronLeft className="h-4 w-4" />
//             Home pe wapas
//           </Link>
//         </div>

//         {/* Dynamic Display of our verified client details */}
//         <div className="w-full flex justify-center">
//           <ResultCard result={resultData} />
//         </div>

//       </div>
//     </div>
//   );
// }
