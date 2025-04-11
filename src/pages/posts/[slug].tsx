import { getPostMeta, incrementView } from '@/utils/postMeta';
import { Box, Container, Typography } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import { useEffect, useState } from 'react';

const postsDirectory = path.join(process.cwd(), 'posts');

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((name) => ({
    params: { slug: name.replace(/\.mdx$/, '') },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  const slug = params.slug;
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf-8');
  const { content, data: meta } = matter(source);
  const mdxSource: MDXRemoteSerializeResult = await serialize(content);

  return {
    props: {
      slug,
      mdxSource,
      meta,
    },
  };
}

export default function BlogPostPage({ mdxSource, meta, slug }: any) {
  const [fireMeta, setFireMeta] = useState({ views: 0, likes: 0 });

  useEffect(() => {
    const fetchPostMeta = async () => {
      const data: any = await getPostMeta(slug);
      setFireMeta(data);
    };
    incrementView(slug);
    fetchPostMeta();
  }, [slug]);

  return (
    <Container maxWidth="md">
      <Box mb={4}>
        <Typography variant="h3" gutterBottom>
          {meta.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {meta.date}
        </Typography>
      </Box>
      <p>조회수: {fireMeta.views}</p>
      <p>좋아요: {fireMeta.likes}</p>

      <MDXRemote {...mdxSource} />
    </Container>
  );
}
