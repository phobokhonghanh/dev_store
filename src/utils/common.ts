import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const DATA_ROOT = path.join(process.cwd(), 'src/data/blogs');

export type PostData = {
    slug: string;
    title: string;
    date?: string;
    excerpt?: string;
    content: string; // Nội dung Markdown
};

export type FolderData = {
    name: string;
    slug: string;
};

// Kết quả trả về: Hoặc là danh sách bài viết (nếu là folder), Hoặc là chi tiết bài (nếu là file)
type ContentResponse =
    | { type: 'folder'; items: { folders: FolderData[]; posts: PostData[] } }
    | { type: 'post'; data: PostData }
    | { type: '404' };

// Cập nhật Type đầu vào để chấp nhận cả string hoặc string[]
export function getContentBySlug(slugInput: string[] | string): ContentResponse {
    // 1. Chuẩn hóa đầu vào thành đường dẫn chuỗi
    // Nếu là mảng (['a', 'b']) -> join thành 'a/b'
    // Nếu là chuỗi ('a') -> giữ nguyên
    const relativePath = Array.isArray(slugInput) ? slugInput.join('/') : slugInput;

    // Kiểm tra an toàn: nếu relativePath rỗng hoặc undefined
    if (!relativePath) {
        return { type: '404' };
    }

    const fullPath = path.join(DATA_ROOT, relativePath);

    // TRƯỜNG HỢP 1: Đường dẫn là một THƯ MỤC (Category/Folder)
    if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
        const items = fs.readdirSync(fullPath, { withFileTypes: true });

        const folders: FolderData[] = [];
        const posts: PostData[] = [];

        items.forEach((item) => {
            if (item.isDirectory()) {
                folders.push({ name: item.name, slug: path.join(relativePath, item.name) });
            } else if (item.name.endsWith('.md')) {
                // Đọc sơ bộ file md để lấy title hiển thị list
                const fileContent = fs.readFileSync(path.join(fullPath, item.name), 'utf-8');
                const { data } = matter(fileContent);
                posts.push({
                    slug: path.join(relativePath, item.name.replace('.md', '')),
                    title: data.title || item.name.replace('.md', ''),
                    date: data.date,
                    excerpt: data.excerpt,
                    content: '', // Không cần load content khi hiển thị list
                });
            }
        });

        return { type: 'folder', items: { folders, posts } };
    }

    // TRƯỜNG HỢP 2: Đường dẫn là một FILE BÀI VIẾT (.md)
    // Nếu URL là /blogs/categories/tech/bai-viet-1 -> tìm file bai-viet-1.md
    const mdPath = `${fullPath}.md`;

    if (fs.existsSync(mdPath)) {
        const fileContent = fs.readFileSync(mdPath, 'utf-8');
        const { data, content } = matter(fileContent);

        return {
            type: 'post',
            data: {
                slug: relativePath,
                title: data.title || (Array.isArray(slugInput) ? slugInput[slugInput.length - 1] : slugInput),
                date: data.date,
                excerpt: data.excerpt,
                content: content, // Nội dung chính để render
            },
        };
    }

    return { type: '404' };
}