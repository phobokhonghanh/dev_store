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
    content: string;
};

export type FolderData = {
    name: string;
    slug: string;
};

type ContentResponse =
    | { type: 'folder'; items: { folders: FolderData[]; posts: PostData[] } }
    | { type: 'post'; data: PostData }
    | { type: '404' };

export function getContentBySlug(slugInput: string[] | string): ContentResponse {
    const relativePath = Array.isArray(slugInput) ? slugInput.join('/') : slugInput;

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
                // Đọc nội dung file để lấy Frontmatter
                const fileContent = fs.readFileSync(path.join(fullPath, item.name), 'utf-8');
                // 'matter' tách phần --- frontmatter --- ra khỏi content
                const { data } = matter(fileContent);

                posts.push({
                    slug: path.join(relativePath, item.name.replace('.md', '')),
                    // Lấy title từ Frontmatter, nếu không có thì format tên file cho đẹp
                    title: data.title || formatFileName(item.name),
                    // Chuyển date sang string ISO để tránh lỗi serializing của Next.js
                    date: data.date ? new Date(data.date).toISOString() : undefined,
                    excerpt: data.excerpt || '',
                    content: '', // Không cần load content khi hiển thị list
                });
            }
        });

        return { type: 'folder', items: { folders, posts } };
    }

    // TRƯỜNG HỢP 2: Đường dẫn là một FILE BÀI VIẾT (.md)
    const mdPath = `${fullPath}.md`;

    if (fs.existsSync(mdPath)) {
        const fileContent = fs.readFileSync(mdPath, 'utf-8');
        const { data, content } = matter(fileContent);

        return {
            type: 'post',
            data: {
                slug: relativePath,
                title: data.title || (Array.isArray(slugInput) ? slugInput[slugInput.length - 1] : slugInput),
                date: data.date ? new Date(data.date).toISOString() : undefined,
                excerpt: data.excerpt || '',
                content: content,
            },
        };
    }

    return { type: '404' };
}

// Helper nhỏ để làm đẹp tên file nếu thiếu title (my-post.md -> My Post)
function formatFileName(filename: string): string {
    const name = filename.replace('.md', '');
    return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}