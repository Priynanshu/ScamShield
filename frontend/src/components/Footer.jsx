import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-7 w-7 text-blue-600" />
              <span className="text-lg font-bold text-blue-600">ScamShield</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              India ka sabse smart AI scam detector. Humara mission hai digital fraud ko rokna aur Bharat ko surakshit rakhna.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col space-y-4 md:items-center">
            <div className="w-full md:max-w-xs">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/community" className="hover:text-blue-600 transition-colors">Community Feed</Link>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Contact/Support */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact & Support</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                <span className="break-all">support@scamshield.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-600 shrink-0" />
                <span>+91 11-4567-8910</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600 shrink-0" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {currentYear} ScamShield. Institutional-grade scam protection. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Safety Tips</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
