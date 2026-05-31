import { Loader2 } from 'lucide-react';

export default function Loader({ text = 'AI scan ho raha hai...' }) {
  return (
    <div id="ai-loader-container" className="flex flex-col items-center justify-center p-8 space-y-3">
      <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      <p className="text-sm font-medium text-gray-600 animate-pulse">{text}</p>
    </div>
  );
}
