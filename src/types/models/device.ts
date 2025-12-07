// src/models/profile.ts
export interface Device {
  id: string;
  agent: string;
  ip: string;
  isActive: boolean;
  lastSeen: Date;
  type: 'desktop' | 'mobile' | 'laptop' | 'other';
};