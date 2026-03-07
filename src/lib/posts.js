import fs from 'fs/promises';
import path from 'node:path';
// @ts-expect-error - js-yaml has no types in this project
import yaml from 'js-yaml';

const BLOG_DIR = path.resolve(process.cwd(), 'blog');

/**
 * @param {string} dir
 * @returns {Promise<Array<{metaPath:string, dirPath:string, raw:string}>>}
 */
async function walk(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  /** @type {Array<{metaPath:string, dirPath:string, raw:string}>} */
  const results = [];
  for (const d of dirents) {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) {
      // If this directory has metadata.yml, collect it; also continue walking for deeper content
      const metaPath = path.join(full, 'metadata.yml');
      try {
        const raw = await fs.readFile(metaPath, 'utf8');
        results.push({ metaPath, dirPath: full, raw });
      } catch {
        // no metadata here, keep walking
      }
      const sub = await walk(full);
      results.push(...sub);
    }
  }
  return results;
}

export async function getAllPosts() {
  const found = await walk(BLOG_DIR);
  const posts = [];

  for (const item of found) {
    try {
      const meta = yaml.load(item.raw) || {};
      const rel = path.relative(BLOG_DIR, item.dirPath);
      // ensure posix-style url
      const urlPath = rel.split(path.sep).join('/');
      const date = meta.date ? new Date(meta.date) : null;
      const isNew = date ? Date.now() - date.getTime() < 1000 * 60 * 60 * 24 * 7 : false;
      const lastSeg = urlPath.split('/').pop();
      posts.push({
        title: meta.title || lastSeg,
        description: meta.description || '',
        author: meta.author || '',
        date: meta.date || null,
        url: `/blog/${urlPath}`,
        isNew,
      });
    } catch {
      // skip invalid metadata
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
