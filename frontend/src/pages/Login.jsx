import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Login — Full-screen login page with glassmorphism card.
 * Uses the AuthContext for simulated JWT authentication.
 */
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="login" id="login-page">
      <div className="login__card">
        <div className="login__header">
          <h1 className="login__logo">🎬 CineVerse</h1>
          <p className="login__subtitle">Sign in to discover amazing movies</p>
        </div>

        {error && (
          <p className="login__error" id="login-error" role="alert">
            {error}
          </p>
        )}

        <form className="login__form" onSubmit={handleSubmit} id="login-form">
          <div className="login__field">
            <label className="login__label" htmlFor="email">
              Email Address
            </label>
            <input
              className="login__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="login__field">
            <label className="login__label" htmlFor="password">
              Password
            </label>
            <input
              className="login__input"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            className="login__btn"
            type="submit"
            id="login-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p
          className="login__hint"
        >
          New to CineVerse? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
