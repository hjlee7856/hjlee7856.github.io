import { Container, Typography } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map(name => ({
    params: { slug: name.replace(/\.mdx$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const fullPath = path.join(postsDirectory, `${params.slug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf-8');
  const { content, data: meta } = matter(source);

  const mdxSource: MDXRemoteSerializeResult = await serialize(content);

  return {
    props: {
      mdxSource,
      meta,
    },
  };
}

export default function BlogPostPage({ mdxSource, meta }: any) {
  return (
    <Container maxWidth="md" className="prose dark:prose-invert">
      <Typography variant="h3" gutterBottom>
        {meta.title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {meta.date}
      </Typography>
      <MDXRemote {...mdxSource} />
    </Container>
  );
}
