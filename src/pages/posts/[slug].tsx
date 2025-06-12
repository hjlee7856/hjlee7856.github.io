import CommentSection from '@/components/comment/commentSection';
import LoadingOverlay from '@/components/loadingOverlay';
import { MDXComponents } from '@/components/MDXComponents';
import { PostHeader } from '@/components/post/postHeader';
import { files, postsDirectory } from '@/constants/files';
import { usePostMeta } from '@/hooks/usePostMeta';
import { useViewCount } from '@/hooks/useViewCount';
import { Box } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
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

export default function PostPage({ mdxSource, meta, slug }: any) {
  // 조회수 증가
  useViewCount(slug);
  // 파이어 스토어에 저장된 메타 정보 가져와서 합치기
  const postMeta = usePostMeta(slug, meta);

  if (!postMeta) return <LoadingOverlay />;

  return (
    <>
      <Head>
        <title>{postMeta.title}</title>
        <meta name="description" content={postMeta.subTitle || postMeta.title} />
        {/* Open Graph */}
        <meta property="og:title" content={postMeta.title} />
        <meta property="og:description" content={postMeta.subTitle || postMeta.title} />
        {postMeta.thumbnail && <meta property="og:image" content={postMeta.thumbnail} />}
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postMeta.title} />
        <meta name="twitter:description" content={postMeta.subTitle || postMeta.title} />
        {postMeta.thumbnail && <meta name="twitter:image" content={postMeta.thumbnail} />}
      </Head>
      <Box paddingInline={2} paddingTop={'1px'}>
        {/* 포스트 헤더 */}
        <PostHeader postMeta={postMeta} />
        {/* 컨텐츠 */}
        <MDXRemote {...mdxSource} components={MDXComponents} />
        {/* 댓글 */}
        <CommentSection slug={slug} postMeta={postMeta} />
      </Box>
    </>
  );
}
