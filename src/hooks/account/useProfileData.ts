// src/hooks/account/useProfileData.ts
'use client';

import { useState, useEffect } from 'react';
import type { UserProfile } from '@/core/models/profile';

// Dữ liệu mẫu
const mockUserProfile: UserProfile = {
  name: 'Nguyễn Văn An',
  email: 'nguyen.an@example.com',
  phone: '0987 654 321',
  birthday: '1995-08-15',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  devices: [
    { id: '1', agent: 'Chrome on Windows', ip: '192.168.1.10', isActive: true, lastSeen: new Date(), type: 'desktop' },
    { id: '2', agent: 'Safari on iPhone', ip: '203.0.113.25', isActive: false, lastSeen: new Date(new Date().setDate(new Date().getDate() - 5)), type: 'mobile' },
    { id: '3', agent: 'Firefox on Linux', ip: '198.51.100.5', isActive: false, lastSeen: new Date(new Date().setMonth(new Date().getMonth() - 1)), type: 'laptop' },
  ],
};

export function useProfileData() {
  const [data, setData] = useState<UserProfile | null>(null);
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
