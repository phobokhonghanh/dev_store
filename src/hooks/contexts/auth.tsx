// src/contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Giả sử bạn sẽ kiểm tra token từ cookie ở đây trong useEffect
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token: string) => {
    // Lưu token vào cookie (hoặc localStorage)
    document.cookie = `authToken=${token}; path=/; max-age=86400`; // 1 day
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Xóa token khỏi cookie
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};