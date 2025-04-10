// pages/index.tsx

import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import path from 'path';

type PostMeta = {
  slug: string;
  title: string;
  date: string;
};

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));

  const posts: PostMeta[] = files.map(filename => {
    const slug = filename.replace('.mdx', '');
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
    };
  });

  // 날짜 최신순 정렬
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: { posts: PostMeta[] }) {
  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>기술 블로그</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <div className="text-xl font-bold hover:underline">{post.title}</div>
            </Link>
            <p className="text-sm text-gray-500">{post.date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
