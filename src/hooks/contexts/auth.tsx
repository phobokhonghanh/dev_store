"use client";
import { LoginResponse } from '@/models/types';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: string | null;
  isLoading: boolean;
  login: (user: LoginResponse) => void;
  logout: () => void;
}

// TODO: Thêm useEffect để kiểm tra session khi tải trang

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = (props: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser).username);
    setIsLoading(false);
  }, [user]);

  const login = (user: LoginResponse) => {
    setUser(user.username);
    localStorage.setItem('user', JSON.stringify(user));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
        {props.children}
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