'use client';

import { User } from '@/types/models/user';
import { useEffect, useState } from 'react';

// Dữ liệu mẫu
const mockUserProfile : User = {
  fullname: 'Nguyễn Văn An',
  email: 'nguyen.an@example.com',
  phone: '0987 654 321',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  id: '1',
  username: 'ab',
  status: '1',
  role: [],
  authProvider: 'system',
  createdAt: '',
  updatedAt: ''
};

export function useProfileData() {
  const [data, setData] = useState<typeof mockUserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Trong thực tế, bạn sẽ gọi API ở đây
        setData(mockUserProfile);
      } catch {
        setError('Không thể tải dữ liệu người dùng.');
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
}