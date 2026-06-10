import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const AuthContext = createContext(null);

const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InUwMDEiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpYXQiOjE3MTgwMDAwMDAsImV4cCI6MTcxODA4NjQwMH0.mock_signature';

const MOCK_USER = {
  id: 'u001',
  username: 'johndoe',
  email: 'john@example.com',
};

/**
 * AuthProvider — Manages authentication state using a simulated JWT.
 * On mount, checks localStorage for a previously stored token.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem('cineverse_token');
    if (storedToken) {
      return MOCK_USER;
    }
    return null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('cineverse_token'));

  const login = useCallback((email, password) => {
    // Simulated authentication — accepts any non-empty credentials
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }

    if (password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    localStorage.setItem('cineverse_token', MOCK_TOKEN);
    setToken(MOCK_TOKEN);
    setUser({ ...MOCK_USER, email });

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('cineverse_token');
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = !!token;

  const value = useMemo(
    () => ({ user, token, isAuthenticated, login, logout }),
    [user, token, isAuthenticated, login, logout]
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
