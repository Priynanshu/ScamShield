import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Result from './pages/Result.jsx';
import Community from './pages/Community.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AuthSuccess from './pages/AuthSuccess.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx';
// import PublicRoute from './components/PublicRoute.jsx';
import { useEffect } from 'react';
import { getMeSlice } from './features/authSlice.js';
import { useDispatch } from 'react-redux';

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // On mount, try to restore session from cookie OR localStorage token.
    // getMeSlice uses the axios interceptor which reads localStorage automatically.
    dispatch(getMeSlice());
  }, [dispatch]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* ── Public Routes ── */}
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/community" element={<PageWrapper><Community /></PageWrapper>} />

        {/* ── Google OAuth callback landing page (no Navbar needed, self-redirects) ── */}
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* ── Public-Only Routes (redirect to / if already logged in) ── */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />

        {/* ── Protected Routes (requires authentication) ── */}
        <Route
          path="/result"
          element={<Result />}
        />

      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
