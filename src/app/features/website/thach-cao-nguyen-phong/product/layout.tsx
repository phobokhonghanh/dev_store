// src/app/features/website/thach-cao-nguyen-phong/product/layout.tsx
import { Metadata } from 'next';
// Import từ file data.ts cùng cấp
import { pageSEO } from './data'; 

export const metadata: Metadata = {
  title: pageSEO.title,
  description: pageSEO.description,
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}