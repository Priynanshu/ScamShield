import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getMeSlice } from '../features/authSlice.js';
import { ShieldCheck, Loader2 } from 'lucide-react';

/**
 * AuthSuccess page — Google OAuth callback landing page.
 * URL: /auth-success?token=<jwt>
 *
 * What it does:
 * 1. Reads the token from the URL query string
 * 2. Saves it to localStorage (so the axios interceptor attaches it to future requests)
 * 3. Calls /auth/me to populate Redux user state
 * 4. Redirects to home
 */
export default function AuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handled = useRef(false); // prevent double-execution in StrictMode

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (!token) {
      // No token — something went wrong with OAuth
      navigate('/login?error=oauth_failed', { replace: true });
      return;
    }

    // Persist the token so the axios interceptor sends it on all future calls
    localStorage.setItem('accessToken', token);

    // Fetch the user profile to hydrate Redux state
    dispatch(getMeSlice()).then(() => {
      navigate('/', { replace: true });
    });
  }, [dispatch, navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 bg-slate-50/20">
      <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center">
        <ShieldCheck className="h-8 w-8 text-blue-600" />
      </div>
      <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
      <p className="text-sm font-semibold text-gray-500">Logging in with Google, please wait...</p>
    </div>
  );
}
