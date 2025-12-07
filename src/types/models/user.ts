// src/models/user.ts
export interface User {
  id: string;
  username: string;
  email: string;
  status: string;
  fullname: string;
  avatar: string;
  role: string[];
  authProvider: string;
  createdAt: string;
  updatedAt: string;
}