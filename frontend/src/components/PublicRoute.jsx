import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * PublicRoute — if already logged in, redirect to home.
 * Don't redirect while session is still being verified (loading=true).
 */
export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // While verifying session, just render the children — avoid redirect flash
  if (loading) return children;

  if (isAuthenticated) return <Navigate to="/" replace />;

  return children;
}
