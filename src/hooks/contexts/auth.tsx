// "use client";
// import { LoginResponse } from '@/types/responses';
// import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// interface AuthContextType {
//   user: string | null;
//   isLoading: boolean;
//   login: (user: LoginResponse) => void;
//   logout: () => void;
// }

// // TODO: Thêm useEffect để kiểm tra session khi tải trang

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = (props: { children: ReactNode }) => {
//   const [user, setUser] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) setUser(JSON.parse(storedUser).username);
//     setIsLoading(false);
//   }, [user]);

//   const login = (user: LoginResponse) => {
//     setUser(user.username);
//     localStorage.setItem('user', JSON.stringify(user));
//     setIsLoading(false);
//   };

//   const logout = () => {
//     setUser(null);
//     setIsLoading(false);
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoading, login, logout }}>
//         {props.children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

"use client";

import { LoginResponse } from '@/types/responses';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode
} from 'react';

// Định nghĩa key cho localStorage để tránh magic string và typo
const STORAGE_KEY = 'user_session';

interface AuthContextType {
  user: string | null;
  isLoading: boolean;
  login: (data: LoginResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State user chỉ lưu username (theo logic gốc), 
  // nhưng có thể mở rộng lưu cả object User nếu cần.
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Kiểm tra session khi mount (chạy 1 lần duy nhất)
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.username) {
            setUser(parsedUser.username);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Failed to parse user session:", error);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // 2. Login: Lưu state và persist vào localStorage
  const login = useCallback((data: LoginResponse) => {
    setUser(data.username);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  // 3. Logout: Xóa state và xóa localStorage
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // 4. Memoize context value để tránh re-render không cần thiết cho consumers
  const contextValue = useMemo(() => ({
    user,
    isLoading,
    login,
    logout
  }), [user, isLoading, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
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