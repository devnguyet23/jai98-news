import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  cover?: string;
  content: string;
}

// Đảm bảo thư mục posts tồn tại
export function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// Lấy tất cả bài viết
export function getAllPosts(): Post[] {
  ensurePostsDirectory();
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || 'Untitled',
        summary: data.summary || '',
        date: data.date || new Date().toISOString(),
        tags: data.tags || [],
        cover: data.cover,
        content,
      } as Post;
    });

  // Sắp xếp theo ngày mới nhất
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Lấy một bài viết theo slug
export function getPostBySlug(slug: string): Post | null {
  ensurePostsDirectory();
  
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      summary: data.summary || '',
      date: data.date || new Date().toISOString(),
      tags: data.tags || [],
      cover: data.cover,
      content,
    } as Post;
  } catch (error) {
    return null;
  }
}

// Lưu bài viết mới
export function savePost(post: Omit<Post, 'slug'>): string {
  ensurePostsDirectory();
  
  // Tạo slug từ title
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  const fileName = `${slug}.md`;
  const fullPath = path.join(postsDirectory, fileName);
  
  // Tạo frontmatter
  const frontmatter = `---
title: "${post.title}"
summary: "${post.summary}"
date: "${post.date}"
tags: [${post.tags.map(tag => `"${tag}"`).join(', ')}]
${post.cover ? `cover: "${post.cover}"` : ''}
---

${post.content}`;

  fs.writeFileSync(fullPath, frontmatter, 'utf8');
  
  return slug;
}
