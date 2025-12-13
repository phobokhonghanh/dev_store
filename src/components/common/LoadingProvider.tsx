"use client";

import { useState, createContext, useContext, useCallback } from 'react';
import { Box, LoadingOverlay } from '@mantine/core';

// 1. Định nghĩa kiểu dữ liệu cho Global Context
interface GlobalLoadingContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

// 2. Tạo Context
const LoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

// 3. Hook để sử dụng ở BẤT KỲ component nào trong app
export const useGlobalLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider');
    }
    return context;
};

interface GlobalLoadingProviderProps {
    children: React.ReactNode;
}

export function LoadingProvider({ children }: GlobalLoadingProviderProps) {
    const [isLoading, setIsLoading] = useState(false);

    // Sử dụng useCallback để tối ưu hiệu năng
    const setLoading = useCallback((loading: boolean) => {
        setIsLoading(loading);
    }, []);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {/* Box bao quanh toàn bộ app. 
        minHeight: '100vh' đảm bảo loading overlay phủ kín màn hình ngay cả khi nội dung ngắn 
      */}
            <Box style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <LoadingOverlay
                    visible={isLoading}
                    zIndex={9999} // Z-index cao để đè lên mọi thứ (navbar, sidebar...)
                    overlayProps={{ radius: "sm", blur: 2, fixed: true }} // fixed: true để phủ toàn màn hình
                />
                {children}
            </Box>
        </LoadingContext.Provider>
    );
}