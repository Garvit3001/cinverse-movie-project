import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar — Top navigation bar with glassmorphism styling.
 * Shows navigation links and a logout button when authenticated.
 * Hides entirely on the login page (when user is not authenticated).
 */
function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar" id="main-navbar">
      <NavLink to="/dashboard" className="navbar__brand">
        <span className="navbar__brand-icon">🎬</span>
        CineVerse
      </NavLink>

      <div className="navbar__links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
          id="nav-dashboard"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
          id="nav-movies"
        >
          Movies
        </NavLink>

        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            `navbar__link ${isActive ? 'navbar__link--active' : ''}`
          }
          id="nav-reviews"
        >
          Reviews
        </NavLink>

        <button
          className="navbar__logout"
          onClick={handleLogout}
          id="nav-logout"
          title={`Logged in as ${user?.username}`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
