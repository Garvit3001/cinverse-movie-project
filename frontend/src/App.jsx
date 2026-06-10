import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import Reviews from './pages/Reviews';

/**
 * App — Root component.
 * Sets up routing with protected routes for authenticated pages.
 *
 * Route structure:
 *   /login      → Login page (public)
 *   /dashboard  → Dashboard (protected)
 *   /movies     → Movies catalogue (protected)
 *   /reviews    → Community reviews (protected)
 *   /           → Redirects to /dashboard
 *   *           → Redirects to /dashboard
 */
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <Reviews />
            </ProtectedRoute>
          }
        />

        {/* Default & fallback redirects */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default App;
