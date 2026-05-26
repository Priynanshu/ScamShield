import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { error, loginHook, loading, googleLogin } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    // Show a clear message instead of silently returning
    if (!form.email.trim() || !form.password.trim()) {
      return;
    }

    await loginHook(form);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50/20 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 border border-gray-200 rounded-xl shadow-sm">
        
        {/* Brand identity header */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">ScamShield Mein Login Karein</h2>
          <p className="text-sm text-gray-500">
            Aapne dosto aur family ko safe rakhne ke liye sign-in karein
          </p>
        </div>

        {/* Action feedback messaging */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login form elements */}
        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Area */}
          <div className="space-y-1.5">
            <label htmlFor="email-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Email ya Mobile Address
            </label>
            <div className="relative">
              <input
                id="email-input"
                type="email"
                required
                placeholder="example@scamshield.in"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all bg-white"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Mail className="h-4 w-4" />
              </div>
            </div>
            <p className="text-[10px] text-gray-400 font-medium">Demo: user@scamshield.in</p>
          </div>

          {/* Password Area */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-blue-600 hover:underline font-semibold">Bhool gaye?</a>
            </div>
            <div className="relative">
              <input
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                className="w-full border border-gray-200 rounded-lg pl-10 pr-10 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-all bg-white"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-4 w-4" />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 font-medium">Demo Password: password123</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-sm text-white transition shadow-sm cursor-pointer ${
                loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:translate-y-[1px]'
            }`}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>

          {/* Google Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Button with SVG to avoid Icon Errors */}
            <button
              type="button"
              onClick={googleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>

        </form>

        <div className="text-center pt-2 border-t border-gray-100 text-xs">
          <p className="text-gray-500 font-medium">
            Account nahi hai?{' '}
            <Link to="/register" className="text-blue-600 hover:underline font-bold transition">
              Naya Account banayein
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
