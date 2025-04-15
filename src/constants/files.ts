import fs from 'fs';
import path from 'path';

export const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');
export const files = fs.readdirSync(postsDirectory);
