import { files, postsDirectory } from '@/constants/files';
import { useGetPostMeta } from '@/pages/blog/posts/hooks/useFetchPostMeta';
import { useViewCount } from '@/pages/blog/posts/hooks/useViewCount';
import { Box, Container, Typography } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';

export async function getStaticPaths() {
  const paths = files.map((name) => ({
    params: { slug: name.replace(/\.mdx$/, '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  // 포스트 가져오기
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
  // 조회수 증가
  useViewCount(slug);
  // 파이어 스토어에 저장된 메타 정보 가져와서 합치기
  const postMeta = useGetPostMeta(slug, meta);

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
      {postMeta && (
        <Box gap={0}>
          <Typography sx={{ m: 1 }} variant="body2">
            조회수: {postMeta.viewCount + 1}
          </Typography>
          <Typography sx={{ m: 1 }} variant="body2">
            좋아요: {postMeta.likeCount}
          </Typography>
        </Box>
      )}
      {/* 컨텐츠 */}
      <MDXRemote {...mdxSource} />
    </Container>
  );
}
