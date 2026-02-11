import fs from 'fs/promises';
import path from 'node:path';
// @ts-ignore - js-yaml has no types in this project
import yaml from 'js-yaml';

const BLOG_DIR = path.resolve(process.cwd(), 'blog');

// Read posts metadata from blog/*/metadata.yml
// Returns array sorted by date desc
export async function getAllPosts() {
  const dirs = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  const posts = [];

  for (const dirent of dirs) {
    if (!dirent.isDirectory()) continue;
    const slug = dirent.name;
    const metaPath = path.join(BLOG_DIR, slug, 'metadata.yml');
    try {
      const raw = await fs.readFile(metaPath, 'utf8');
      const meta = yaml.load(raw) || {};
      const date = meta.date ? new Date(meta.date) : null;
      const isNew = date ? (Date.now() - date.getTime()) < 1000 * 60 * 60 * 24 * 7 : false;
      posts.push({
        title: meta.title || slug,
        description: meta.description || '',
        author: meta.author || '',
        date: meta.date || null,
        url: `/blog/${slug}`,
        isNew
      });
    } catch (e) {
      // skip if metadata.yml missing or invalid
      continue;
    }
  }

  posts.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  return posts;
}
