import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem('scamshield_current_user');
      if (stored) {
        try {
          setCurrentUser(JSON.parse(stored));
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkAuth();
    // Listen to local changes inside auth
    window.addEventListener('authChange', checkAuth);
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('scamshield_current_user');
    setCurrentUser(null);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleScanClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation then scroll to scanner
      setTimeout(() => {
        const element = document.getElementById('scan-section');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('scan-section');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-blue-600" />
              <span id="nav-brand-title" className="text-xl font-bold text-blue-600 tracking-tight">ScamShield</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:ml-6 md:flex md:space-x-8 md:items-center">
            <Link 
              to="/" 
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors`}
            >
              Home
            </Link>
            <button 
              onClick={() => handleNavClick('how-it-works')}
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer border-b-2 border-transparent"
            >
              How it Works
            </button>
            <Link 
              to="/community" 
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${location.pathname === '/community' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700 hover:text-blue-600'} transition-colors`}
            >
              Community
            </Link>
          </div>

          {/* Button Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            
            {currentUser ? (
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg p-1.5 px-3">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-medium text-gray-400">Namaste!</span>
                  <span className="text-xs font-bold text-gray-800 leading-tight">{currentUser.name || 'Citizen'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout karein"
                  className="ml-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-lg px-3 py-2 hover:bg-blue-100 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={handleScanClick}
              id="btn-navbar-scan"
              className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 shadow-sm active:translate-y-[1px] transition cursor-pointer"
            >
              Scan Karo
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3 px-4 space-y-2.5 shadow-inner">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-semibold ${location.pathname === '/' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
          >
            Home
          </Link>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="w-full text-left block px-3 py-2 rounded-md text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 cursor-pointer"
          >
            How it Works
          </button>
          <Link
            to="/community"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-semibold ${location.pathname === '/community' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}`}
          >
            Community
          </Link>
          
          <hr className="border-gray-100 my-1" />

          {/* Mobile Profile & Authenticator */}
          {currentUser ? (
            <div className="flex items-center justify-between bg-gray-50 border border-gray-100 p-3 rounded-lg mx-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-bold text-gray-800">Namaste, {currentUser.name}!</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-red-600 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 px-3 py-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-sm font-bold border border-gray-200 rounded-lg py-2 text-gray-600 hover:bg-gray-50"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center text-sm font-bold bg-blue-50 text-blue-600 border border-blue-100 rounded-lg py-2 hover:bg-blue-100"
              >
                Register
              </Link>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleScanClick}
              className="w-full text-center bg-blue-600 text-white rounded-lg px-4 py-2.5 text-base font-semibold hover:bg-blue-700 shadow transition cursor-pointer"
            >
              Scan Karo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
