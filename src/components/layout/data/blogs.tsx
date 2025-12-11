// import 'server-only';
// import fs from 'fs';
// import path from 'path';
// import React from 'react';
// import {
//     IconTag,
//     IconNotebook,
//     IconSearch,
// } from "@tabler/icons-react";
// import { NavRoute, RawNav } from "@/components/layout/nav_link/type";

// // --- 1. CONFIGURATION ---

// const PATH_MAPPING: Record<string, string> = {
//     // Nếu thư mục này tồn tại và có folder con, nó sẽ tạo menu dropdown
//     // Nếu thư mục này RỖNG hoặc KHÔNG TỒN TẠI, nó sẽ giữ nguyên link là 'blogs/categories'
//     'blogs/categories': 'src/data/blogs/categories',
//     'blogs/series': 'src/data/blogs/series',
// };

// const staticRawRoutes: RawNav[] = [
//     {
//         label: "Search",
//         slug: "blogs",
//         icon: <IconSearch size={16} stroke={1.5} />,
//     },
//     {
//         label: "Categories",
//         slug: "blogs/categories",
//         icon: <IconTag size={16} stroke={1.5} />,
//         opened: true,
//         children: [],
//     },
//     {
//         label: "Series",
//         slug: "blogs/series",
//         icon: <IconNotebook size={16} stroke={1.5} />,
//         children: [
//             { label: "Next.js Mastery", slug: "nextjs" },
//             { label: "Mantine UI", slug: "mantine" },
//         ],
//     },
// ];

// // --- 2. Helper Functions ---

// function formatCategoryLabel(folderName: string): string {
//     return folderName
//         .split('-')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');
// }

// function buildRoutes(nav: RawNav[], parent = ""): NavRoute[] {
//     return nav.map((item): NavRoute => {
//         const isExternal = item.slug.startsWith("http");
//         const currentPath = isExternal
//             ? item.slug
//             : parent === "" ? `/${item.slug ?? ""}` : `${parent}/${item.slug}`;

//         return {
//             label: item.label,
//             href: currentPath === "/" ? "/" : currentPath,
//             icon: item.icon,
//             opened: item.opened ?? false,
//             // Logic quan trọng: Nếu children undefined, item này sẽ hoạt động như một Link bình thường
//             children: item.children ? buildRoutes(item.children, currentPath) : undefined,
//         };
//     });
// }

// // Hàm đọc thư mục và trả về danh sách RawNav con
// function getDynamicChildren(relativePath: string): RawNav[] {
//     const fullPath = path.join(process.cwd(), relativePath);

//     // 1. Kiểm tra thư mục có tồn tại không trước khi đọc
//     if (!fs.existsSync(fullPath)) {
//         return []; // Trả về mảng rỗng -> Fallback về link gốc
//     }

//     try {
//         const items = fs.readdirSync(fullPath, { withFileTypes: true });
//         return items
//             .filter(item => item.isDirectory())
//             .map(folder => ({
//                 label: formatCategoryLabel(folder.name),
//                 slug: folder.name,
//             }));
//     } catch (error) {
//         console.error(`Error reading dynamic routes at ${relativePath}:`, error);
//         return [];
//     }
// }

// // Hàm đệ quy để quét toàn bộ staticRawRoutes và inject dữ liệu động
// function injectDynamicRoutes(routes: RawNav[]): RawNav[] {
//     return routes.map(route => {
//         const mappedPath = PATH_MAPPING[route.slug];
//         let dynamicChildren: RawNav[] = [];

//         if (mappedPath) {
//             dynamicChildren = getDynamicChildren(mappedPath);
//         }

//         const existingChildren = route.children ? injectDynamicRoutes(route.children) : [];
//         const mergedChildren = [...dynamicChildren, ...existingChildren];

//         // LOGIC FALLBACK:
//         // Nếu mergedChildren rỗng (do không đọc được thư mục + không có con tĩnh),
//         // ta trả về undefined. Khi children là undefined, 
//         // hàm buildRoutes sẽ tạo ra href trỏ thẳng đến slug của cha (vd: /blogs/categories)
//         return {
//             ...route,
//             children: mergedChildren.length > 0 ? mergedChildren : undefined
//         };
//     });
// }

// // --- 3. Main Generator Function ---

// export function getBlogRoutes(): NavRoute[] {
//     const mergedRawRoutes = injectDynamicRoutes(staticRawRoutes);
//     return buildRoutes(mergedRawRoutes);
// }

import 'server-only';
import fs from 'fs';
import path from 'path';
import React from 'react';
import {
    IconFolder,
    IconSearch,
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
// rootPath: Đường dẫn vật lý (vd: src/data/blogs)
// urlPrefix: Tiền tố URL (vd: /blogs)
function scanDirectory(physicalPath: string, urlPrefix: string): RawNav[] {
    const fullPath = path.join(process.cwd(), physicalPath);

    if (!fs.existsSync(fullPath)) return [];

    try {
        const items = fs.readdirSync(fullPath, { withFileTypes: true });

        // Lọc lấy các thư mục (vì file .md là bài viết, ta không hiện lên menu chính, chỉ hiện category)
        const folders = items.filter(item => item.isDirectory());

        return folders.map(folder => {
            const folderSlug = folder.name;
            const nextPhysicalPath = path.join(physicalPath, folderSlug);
            const nextUrlPrefix = `${urlPrefix}/${folderSlug}`;

            // Đệ quy: Tìm xem trong folder này có folder con không (Sub-categories)
            const children = scanDirectory(nextPhysicalPath, nextUrlPrefix);

            return {
                label: formatLabel(folderSlug),
                slug: nextUrlPrefix, // Lưu full URL vào slug để buildRoutes xử lý dễ hơn
                icon: <IconFolder size={16} stroke={1.5} />,
                opened: false, // Mặc định đóng
                // Nếu có con thì gán children, không thì undefined
                children: children.length > 0 ? children : undefined
            };
        });

    } catch (error) {
        console.error(`Error scanning directory ${physicalPath}:`, error);
        return [];
    }
}

// Helper buildRoutes: Chuyển đổi từ RawNav sang NavRoute (chuẩn UI)
function buildRoutes(nav: RawNav[]): NavRoute[] {
    return nav.map((item): NavRoute => {
        // Slug trong logic mới này đã là đường dẫn đầy đủ (bắt đầu bằng /)
        // hoặc là tên tĩnh (như 'blogs')
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
    // 1. Quét động toàn bộ thư mục src/data/blogs
    // Kết quả sẽ trả về cấu trúc cây:
    // - Categories (/blogs/categories)
    //   - Tech (/blogs/categories/tech)
    // - Cook Tutorial (/blogs/cook-tutorial)
    const dynamicRoutes = scanDirectory(DATA_ROOT, '/blogs');

    // 2. Gộp với menu tĩnh (Search)
    const allRawRoutes = [...staticHeadRoutes, ...dynamicRoutes];

    // 3. Build thành format chuẩn cho Navbar
    return buildRoutes(allRawRoutes);
}