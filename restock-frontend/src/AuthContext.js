import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt_token') || '');

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('jwt_token', newToken);
    console.log('Logging in with token:', newToken);
  };

  const logout = () => {
    console.log('Logging out');
    setToken('');
    localStorage.removeItem('jwt_token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
