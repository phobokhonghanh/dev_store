// src/models/profile.ts
export type Device = {
  id: string;
  agent: string;
  ip: string;
  isActive: boolean;
  lastSeen: Date;
  type: 'desktop' | 'mobile' | 'laptop' | 'other';
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  avatar: string;
  devices: Device[];
};
