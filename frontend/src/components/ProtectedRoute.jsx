import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — Wrapper component that guards routes behind authentication.
 *
 * If the user is not authenticated (no JWT in localStorage),
 * they are redirected to the login page. The current location
 * is preserved so they can be redirected back after login.
 *
 * Props:
 * @param {ReactNode} children - The child route component to render
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
