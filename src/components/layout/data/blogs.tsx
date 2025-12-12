import 'server-only';
import fs from 'fs';
import path from 'path';
import React from 'react';
import {
    IconFolder,
    IconSearch,
    IconFileText, // Import thêm icon cho file bài viết
} from "@tabler/icons-react";
import { NavRoute, RawNav } from "@/components/layout/nav_link/type";

// --- 1. CONFIGURATION ---

// Đường dẫn gốc chứa dữ liệu blogs
const DATA_ROOT = 'src/data/blogs';

// Các mục tĩnh luôn hiển thị ở đầu
const staticHeadRoutes: RawNav[] = [
    {
        label: "Search",
        slug: "blogs", // Link về trang chủ blogs
        icon: <IconSearch size={16} stroke={1.5} />,
    },
];

// --- 2. Helper Functions ---

function formatLabel(slug: string): string {
    // cook-tutorial -> Cook Tutorial
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Hàm đệ quy: Quét thư mục data để tạo cây menu
// physicalPath: Đường dẫn vật lý (vd: src/data/blogs)
// urlPrefix: Tiền tố URL (vd: /blogs)
function scanDirectory(physicalPath: string, urlPrefix: string): RawNav[] {
    const fullPath = path.join(process.cwd(), physicalPath);

    if (!fs.existsSync(fullPath)) return [];

    try {
        const items = fs.readdirSync(fullPath, { withFileTypes: true });

        // 1. Lọc lấy Folder HOẶC File .md
        const validItems = items.filter(item =>
            item.isDirectory() || (item.isFile() && item.name.endsWith('.md'))
        );

        // 2. Sắp xếp: Folder lên trước, File xuống dưới
        validItems.sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;
            return a.name.localeCompare(b.name);
        });

        return validItems.map(item => {
            const isDir = item.isDirectory();
            const rawName = item.name;

            // Nếu là file .md thì bỏ đuôi đi để lấy slug đẹp
            const slugName = isDir ? rawName : rawName.replace(/\.md$/, '');

            // Đường dẫn vật lý tiếp theo (chỉ dùng nếu là folder để scan tiếp)
            const nextPhysicalPath = path.join(physicalPath, rawName);

            // URL hiển thị trên trình duyệt
            const nextUrlPrefix = `${urlPrefix}/${slugName}`;

            let children: RawNav[] = [];

            // Chỉ đệ quy nếu là thư mục
            if (isDir) {
                children = scanDirectory(nextPhysicalPath, nextUrlPrefix);
            }

            return {
                label: formatLabel(slugName), // Format tên (bao gồm cả tên file md)
                slug: nextUrlPrefix,
                // Chọn Icon tương ứng
                icon: isDir
                    ? <IconFolder size={16} stroke={1.5} />
                    : <IconFileText size={16} stroke={1.5} />,
                opened: true,
                children: children.length > 0 ? children : undefined
            };
        });

    } catch (error) {
        console.error(`Error scanning directory ${physicalPath}:`, error);
        return [];
    }
}

// Helper buildRoutes: Chuyển đổi từ RawNav sang NavRoute
function buildRoutes(nav: RawNav[]): NavRoute[] {
    return nav.map((item): NavRoute => {
        const href = item.slug.startsWith('/')
            ? item.slug
            : `/${item.slug}`;

        return {
            label: item.label,
            href: href,
            icon: item.icon,
            opened: item.opened ?? false,
            children: item.children ? buildRoutes(item.children) : undefined,
        };
    });
}

// --- 3. Main Generator Function ---

export function getBlogRoutes(): NavRoute[] {
    // 1. Quét động toàn bộ thư mục src/data/blogs (bao gồm cả file .md)
    const dynamicRoutes = scanDirectory(DATA_ROOT, '/blogs');

    // 2. Gộp với menu tĩnh (Search)
    const allRawRoutes = [...staticHeadRoutes, ...dynamicRoutes];

    // 3. Build thành format chuẩn cho Navbar
    return buildRoutes(allRawRoutes);
}