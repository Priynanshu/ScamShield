// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MessageSquare, Image, Link, Upload, Search, X, AlertCircle } from 'lucide-react';
// import useScan from '../hooks/useScan.js';
// import Loader from './Loader.jsx';

// export default function ScanBox() {
//   const [activeTab, setActiveTab] = useState('text'); // 'text', 'image', 'url'
//   const [textInput, setTextInput] = useState('');
//   const [urlInput, setUrlInput] = useState('');
  
//   // Image upload state
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [dragActive, setDragActive] = useState(false);
  
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();
//   const { scan, loading, error } = useScan();

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   // Drag & Drop event handlers
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const file = e.dataTransfer.files[0];
//       processFile(file);
//     }
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       processFile(file);
//     }
//   };

//   const processFile = (file) => {
//     // Check if it's an image
//     if (!file.type.startsWith('image/')) {
//       alert('Kripya sirf image file upload karein (PNG, JPG, JPEG)');
//       return;
//     }
//     setSelectedFile(file);
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const removeSelectedImage = (e) => {
//     e.stopPropagation();
//     setSelectedFile(null);
//     setImagePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const triggerFileSelect = () => {
//     fileInputRef.current.click();
//   };

//   const handleScanSubmit = async (e) => {
//     e.preventDefault();
    
//     let payload = null;
//     if (activeTab === 'text') {
//       if (!textInput.trim()) return;
//       payload = textInput;
//     } else if (activeTab === 'url') {
//       if (!urlInput.trim()) return;
//       payload = urlInput;
//     } else if (activeTab === 'image') {
//       if (!selectedFile) return;
//       payload = selectedFile;
//     }

//     const { success, result, error: scanError } = await scan(activeTab, payload);
    
//     if (success && result) {
//       navigate('/result', { state: { result } });
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//       {/* Tab Selectors */}
//       <div className="flex border-b border-gray-100 bg-gray-50/50">
//         <button
//           type="button"
//           onClick={() => handleTabChange('text')}
//           className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
//             activeTab === 'text'
//               ? 'text-blue-600 border-blue-600 bg-white'
//               : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50/50'
//           }`}
//         >
//           <MessageSquare className="h-4 w-4" />
//           Text
//         </button>
//         <button
//           type="button"
//           onClick={() => handleTabChange('image')}
//           className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
//             activeTab === 'image'
//               ? 'text-blue-600 border-blue-600 bg-white'
//               : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50/50'
//           }`}
//         >
//           <Image className="h-4 w-4" />
//           Image
//         </button>
//         <button
//           type="button"
//           onClick={() => handleTabChange('url')}
//           className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
//             activeTab === 'url'
//               ? 'text-blue-600 border-blue-600 bg-white'
//               : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50/50'
//           }`}
//         >
//           <Link className="h-4 w-4" />
//           URL
//         </button>
//       </div>

//       {loading ? (
//         <div className="p-8">
//           <Loader text="AI scanner aapka input scan kar raha hai. Kripya 10 seconds veit karein..." />
//         </div>
//       ) : (
//         <form onSubmit={handleScanSubmit} className="p-6 md:p-8 space-y-6">
//           {error && (
//             <div className="flex items-start gap-2 p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm">
//               <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
//               <span>{error}</span>
//             </div>
//           )}

//           {/* Active Tab Inputs */}
//           {activeTab === 'text' && (
//             <div className="space-y-2">
//               <label htmlFor="text-scan-area" className="block text-sm font-semibold text-gray-900">
//                 Paste suspicious message or text
//               </label>
//               <textarea
//                 id="text-scan-area"
//                 rows="6"
//                 placeholder="WhatsApp message, SMS ya koi bhi text yahan paste karo..."
//                 value={textInput}
//                 onChange={(e) => setTextInput(e.target.value)}
//                 className="w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-800 placeholder-gray-400 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all resize-none"
//               />
//             </div>
//           )}

//           {activeTab === 'image' && (
//             <div className="space-y-2">
//               <label className="block text-sm font-semibold text-gray-900">
//                 Upload screenshot or suspicious image
//               </label>
              
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 accept="image/*"
//                 className="hidden"
//               />

//               <div
//                 onDragEnter={handleDrag}
//                 onDragOver={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDrop={handleDrop}
//                 onClick={triggerFileSelect}
//                 className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
//                   dragActive 
//                     ? 'border-blue-600 bg-blue-50/40' 
//                     : 'border-gray-200 hover:border-blue-600 hover:bg-gray-50/50'
//                 }`}
//               >
//                 {imagePreview ? (
//                   <div className="relative inline-block group">
//                     <img
//                       src={imagePreview}
//                       alt="Uploaded preview"
//                       className="max-h-48 rounded border border-gray-200 shadow-sm object-contain"
//                     />
//                     <button
//                       type="button"
//                       onClick={removeSelectedImage}
//                       className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 transition"
//                       title="Clear image"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                     <p className="mt-2 text-xs font-medium text-gray-500">{selectedFile?.name}</p>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 shadow-inner">
//                       <Upload className="h-6 w-6" />
//                     </div>
//                     <p className="text-sm font-semibold text-gray-700">Drag & drop your screenshot here</p>
//                     <p className="text-xs text-gray-400 mt-1">ya folder se click karke browse karein</p>
//                     <p className="text-xs text-gray-400 mt-3 font-medium">PNG, JPG, JPEG formats are allowed</p>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === 'url' && (
//             <div className="space-y-2">
//               <label htmlFor="url-scan-input" className="block text-sm font-semibold text-gray-900">
//                 Paste suspicious link
//               </label>
//               <div className="relative">
//                 <input
//                   id="url-scan-input"
//                   type="text"
//                   placeholder="Suspicious link yahan paste karo..."
//                   value={urlInput}
//                   onChange={(e) => setUrlInput(e.target.value)}
//                   className="w-full border border-gray-200 rounded-lg p-4 pr-12 text-sm text-gray-800 placeholder-gray-400 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all"
//                 />
//                 <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
//                   <Link className="h-5 w-5" />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Submit Action Block */}
//           <div>
//             <button
//               type="submit"
//               disabled={
//                 (activeTab === 'text' && !textInput.trim()) ||
//                 (activeTab === 'url' && !urlInput.trim()) ||
//                 (activeTab === 'image' && !selectedFile)
//               }
//               className={`w-full py-3.5 px-5 rounded-lg font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
//                 (activeTab === 'text' && !textInput.trim()) ||
//                 (activeTab === 'url' && !urlInput.trim()) ||
//                 (activeTab === 'image' && !selectedFile)
//                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:translate-y-px'
//               }`}
//             >
//               <Search className="h-4 w-4" />
//               Scan Karo
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }
