import { postsDirectory } from '@/constants/directory';
import { useFetchPostMeta } from '@/hooks/useFetchPostMeta';
import { usePost } from '@/hooks/usePost';
import { Box, Container, Typography } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

export async function getStaticPaths() {
  const files = fs.readdirSync(postsDirectory);
  const paths = files.map((name) => ({
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
  // 파이어 스토어에 저장된 메타 정보 가져오고, 조회수 올리기
  const fireMeta = useFetchPostMeta(slug);
  const { handleLike, likeActive } = usePost(slug, fireMeta);

  return (
    <Container maxWidth="md">
      {/* 페이지 헤더 */}
      <Box mb={4}>
        <Typography variant="h3" gutterBottom>
          {meta.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {meta.date}
        </Typography>
      </Box>
      <p>조회수: {fireMeta?.views}</p>
      <p>좋아요: {fireMeta?.likes}</p>
      {/* 컨텐츠 */}
      <MDXRemote {...mdxSource} />
    </Container>
  );
}
