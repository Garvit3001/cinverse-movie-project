import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await register(form);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="login" id="register-page">
      <div className="login__card">
        <div className="login__header">
          <h1 className="login__logo">Join CineVerse</h1>
          <p className="login__subtitle">Create a secure JWT-backed account</p>
        </div>

        {error && (
          <p className="login__error" id="register-error" role="alert">
            {error}
          </p>
        )}

        <form className="login__form" onSubmit={handleSubmit} id="register-form">
          <div className="login__field">
            <label className="login__label" htmlFor="name">
              Name
            </label>
            <input
              className="login__input"
              id="name"
              type="text"
              placeholder="Aarav Mehta"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              required
              minLength="2"
              autoComplete="name"
            />
          </div>

          <div className="login__field">
            <label className="login__label" htmlFor="email">
              Email Address
            </label>
            <input
              className="login__input"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
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
              placeholder="At least 6 characters"
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
              required
              minLength="6"
              autoComplete="new-password"
            />
          </div>

          <div className="login__field">
            <label className="login__label" htmlFor="role">
              Role
            </label>
            <select
              className="login__input"
              id="role"
              value={form.role}
              onChange={(event) => updateField('role', event.target.value)}
            >
              <option value="USER">User</option>
              <option value="THEATRE_OWNER">Theatre owner</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            className="login__btn"
            type="submit"
            id="register-submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="login__hint">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
