import { ClipboardCopy, Cpu, ShieldCheck, Quote } from 'lucide-react';
import ScanBox from '../components/ScanBox.jsx';
import StatsBar from '../components/StatsBar.jsx';

export default function Home() {
  const steps = [
    {
      num: '1',
      title: 'Paste it',
      desc: 'Suspicious WhatsApp message, URL Link ya image screenshot submit karo.',
      icon: <ClipboardCopy className="h-6 w-6 text-blue-600" />,
    },
    {
      num: '2',
      title: 'Scan By AI',
      desc: 'Our customized institutional-grade Gemini AI scan will analyze it in 10 seconds.',
      icon: <Cpu className="h-6 w-6 text-blue-600 animate-pulse" />,
    },
    {
      num: '3',
      title: 'See Results',
      desc: 'Find out whether it is safe, suspicious, or if our Scam Alert is active.',
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
    },
  ];

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      city: 'Delhi',
      quote: 'I received a WhatsApp message about a lottery, and after double-checking on ScamShield, I got a direct SCAM report! I was saved, bro.',
    },
    {
      name: 'Pooja Sharma',
      city: 'Mumbai',
      quote: 'While sitting at home, I received a message about earning 5000 by liking a video. After scanning it here, the AI showed all the red flags. Truly super smart tracker.',
    },
    {
      name: 'Anil Deshmukh',
      city: 'Pune',
      quote: 'I received a disconnection warning message from the Kalyan Electricity Board; this app scanned it immediately and identified it as a fraud attempt.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* 1. Hero Section */}
      <section id="hero-section" className="relative bg-white py-12 md:py-20 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-none leading-tight">
              Is this a <span className="text-blue-600">scam</span>?
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium max-w-2xl mx-auto">
              India's Smartest Scam Detector — Find Out in Just 10 Seconds.
            </p>
          </div>

          <div id="scan-section" className="w-full flex justify-center pt-4">
            <ScanBox />
          </div>
        </div>
      </section>

      {/* 2. Stats Section — real data from DB */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsBar />
        </div>
      </section>

      {/* 3. "Kaise Kaam Karta Hai" Step Wizard */}
      <section id="how-it-works" className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">How It Works?</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">India's smartest scam detector. Find out in just 10 seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm space-y-4 hover:border-blue-50 transition duration-200">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {step.num}. {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials Block */}
      <section className="bg-slate-50/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Only genuine experiences</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">Thousands of people have saved themselves from falling victim to digital fraud.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm relative space-y-4 hover:bg-gray-50/40 transition">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-blue-100 stroke-1" />
                <p className="text-sm text-gray-600 italic leading-relaxed pt-2">
                  "{test.quote}"
                </p>
                <div className="flex flex-col leading-tight pt-2 border-t border-gray-100">
                  <span className="font-bold text-gray-900 text-sm">{test.name}</span>
                  <span className="text-xs text-blue-600 font-semibold">{test.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
