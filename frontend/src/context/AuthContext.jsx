import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUwMDEiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpYXQiOjE3MTgwMDAwMDAsImV4cCI6MTcxODA4NjQwMH0.mock_signature';

const MOCK_USER = {
  id: 'u001',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'USER',
};

/**
 * AuthProvider — Manages authentication state using a simulated JWT.
 * On mount, checks localStorage for a previously stored token.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('cineverse_user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        localStorage.removeItem('cineverse_user');
      }
    }

    const storedToken = localStorage.getItem('cineverse_token');
    if (storedToken) {
      return MOCK_USER;
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('cineverse_token'));

  const persistSession = useCallback((authData) => {
    localStorage.setItem('cineverse_token', authData.token);
    localStorage.setItem('cineverse_user', JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
  }, []);

  const login = useCallback(async (email, password) => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    try {
      const response = await authAPI.login({ email, password });
      persistSession(response.data);
      return { success: true };
    } catch (error) {
      const apiMessage = error.response?.data?.message;
      if (apiMessage) {
        return { success: false, error: apiMessage };
      }

      if (password.length < 4) {
        return { success: false, error: 'Password must be at least 4 characters.' };
      }

      const fallbackUser = { ...MOCK_USER, email, name: email.split('@')[0] || MOCK_USER.name };
      persistSession({ token: MOCK_TOKEN, user: fallbackUser });
      return { success: true, fallback: true };
    }
  }, [persistSession]);

  const register = useCallback(async ({ name, email, password, role }) => {
    if (!name || !email || !password) {
      return { success: false, error: 'Name, email, and password are required.' };
    }

    try {
      const response = await authAPI.register({ name, email, password, role });
      persistSession(response.data);
      return { success: true };
    } catch (error) {
      const apiMessage = error.response?.data?.message;
      return { success: false, error: apiMessage || 'Registration failed. Please try again.' };
    }
  }, [persistSession]);

  const logout = useCallback(() => {
    localStorage.removeItem('cineverse_token');
    localStorage.removeItem('cineverse_user');
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = !!token;

  const value = useMemo(
    () => ({ user, token, isAuthenticated, login, register, logout }),
    [user, token, isAuthenticated, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth — Hook to access the authentication context.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
