import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MessageSquare, Image, Link as LinkIcon, Upload, Search, X, AlertCircle, Globe, LogIn } from 'lucide-react';
import { useSelector } from 'react-redux';
import Loader from './Loader.jsx';
import useScan from '../hooks/useScan';

const LANGUAGES = [
  { value: 'English',    label: 'English' },
  { value: 'Hindi',      label: 'हिंदी (Hindi)' },
  { value: 'Spanish',    label: 'Español (Spanish)' },
  { value: 'French',     label: 'Français (French)' },
  { value: 'German',     label: 'Deutsch (German)' },
  { value: 'Chinese',    label: '中文 (Chinese)' },
  { value: 'Japanese',   label: '日本語 (Japanese)' },
  { value: 'Korean',     label: '한국어 (Korean)' },
  { value: 'Russian',    label: 'Русский (Russian)' },
  { value: 'Arabic',     label: 'العربية (Arabic)' },
];

export default function ScanBox() {
  const [activeTab, setActiveTab]   = useState('text');
  const [textInput, setTextInput]   = useState('');
  const [urlInput, setUrlInput]     = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  // Guest-mode: show login prompt instead of scan result
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);

  const fileInputRef = useRef(null);
  const navigate     = useRef(useNavigate()).current;

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { scanLoading, scanError, scamDetectOfTextHook, scamDetectOfUrlHook, scamDetectOfImageHook } = useScan();

  // ── File Handling ──────────────────────────────────────────────
  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else setDragActive(false);
  };
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]);
  };
  const handleFileChange = (e) => { if (e.target.files?.[0]) processFile(e.target.files[0]); };
  const processFile = (file) => {
    if (!file.type.startsWith('image/')) { alert('Sirf image file upload karein (PNG, JPG, JPEG)'); return; }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };
  const removeImage = (e) => {
    e.stopPropagation();
    setSelectedFile(null); setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Submit ──────────────────────────────────────────────────────
  const handleScanSubmit = async (e) => {
    e.preventDefault();

    // Guest mode: show login prompt with the message pre-filled context
    if (!isAuthenticated) {
      setShowGuestPrompt(true);
      return;
    }

    setShowGuestPrompt(false);
    let response;
    if (activeTab === 'text')  response = await scamDetectOfTextHook(textInput, selectedLanguage);
    if (activeTab === 'url')   response = await scamDetectOfUrlHook(urlInput, selectedLanguage);
    if (activeTab === 'image') response = await scamDetectOfImageHook(selectedFile, selectedLanguage);

    if (response && !response.error && response.payload) {
      navigate('/result', { state: { result: response.payload } });
    }
  };

  const isSubmitDisabled =
    (activeTab === 'text'  && !textInput.trim())  ||
    (activeTab === 'url'   && !urlInput.trim())   ||
    (activeTab === 'image' && !selectedFile);

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

      {/* Tab Bar */}
      <div className="flex border-b border-gray-100 bg-gray-50/50">
        {[
          { id: 'text',  Icon: MessageSquare, label: 'Text'  },
          { id: 'image', Icon: Image,         label: 'Image' },
          { id: 'url',   Icon: LinkIcon,      label: 'URL'   },
        ].map(({ id, Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => { setActiveTab(id); setShowGuestPrompt(false); }}
            className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === id
                ? 'text-blue-600 border-blue-600 bg-white'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {scanLoading ? (
        <div className="p-8">
          <Loader text="AI scanner aapka input scan kar raha hai. Kripya 10 seconds wait karein..." />
        </div>
      ) : (
        <form onSubmit={handleScanSubmit} className="p-6 md:p-8 space-y-5">

          {/* Error */}
          {scanError && (
            <div className="flex items-start gap-2 p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{scanError}</span>
            </div>
          )}

          {/* Guest Login Prompt — shown instead of redirecting */}
          {showGuestPrompt && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <LogIn className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-bold text-blue-800">Login required to scan</p>
                <p className="text-xs text-blue-600">Use your account to scan — it's completely free!</p>
              </div>
              <Link
                to="/login"
                className="shrink-0 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Login / Register
              </Link>
            </div>
          )}

          {/* Language Dropdown */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
              <Globe className="h-4 w-4 text-blue-600" />
              Response Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
            <p className="text-xs text-gray-400">AI will provide its analysis in this language</p>
          </div>

          {/* Text Tab */}
          {activeTab === 'text' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">
                Paste suspicious message or text
              </label>
              <textarea
                rows="6"
                placeholder="Paste WhatsApp messages, SMS, or any text here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-4 text-sm text-gray-800 placeholder-gray-400 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all resize-none"
              />
            </div>
          )}

          {/* Image Tab */}
          {activeTab === 'image' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Upload screenshot</label>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <div
                onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  dragActive ? 'border-blue-600 bg-blue-50/40' : 'border-gray-200 hover:border-blue-600 hover:bg-gray-50/50'
                }`}
              >
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img src={imagePreview} alt="Preview" className="max-h-48 rounded border border-gray-200 shadow-sm object-contain" />
                    <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 transition">
                      <X className="h-4 w-4" />
                    </button>
                    <p className="mt-2 text-xs font-medium text-gray-500">{selectedFile?.name}</p>
                  </div>
                ) : (
                  <>
                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Drag & drop screenshot here</p>
                    <p className="text-xs text-gray-400 mt-1">Or click to browse.</p>
                    <p className="text-xs text-gray-400 mt-3 font-medium">PNG, JPG, JPEG allowed</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* URL Tab */}
          {activeTab === 'url' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-900">Paste suspicious link</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Suspicious link yahan paste karo..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg p-4 pr-12 text-sm text-gray-800 placeholder-gray-400 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                  <LinkIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitDisabled && isAuthenticated}
            className={`w-full py-3.5 px-5 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
              isSubmitDisabled && isAuthenticated
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:translate-y-px cursor-pointer'
            }`}
          >
            <Search className="h-4 w-4" />
            Scan Karo
          </button>

        </form>
      )}
    </div>
  );
}
