import { PostCard } from '@/components/postCard';
import { categories } from '@/constants/categorys';
import { files, postsDirectory } from '@/constants/files';
import { useCategory } from '@/hooks/useCategory';
import { usePostMetas } from '@/hooks/useMetas';
import { usePagination } from '@/hooks/usePagenation';
import { Box, Container, Pagination, Tab, Tabs } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { useEffect } from 'react';

export async function getStaticProps() {
  // 포스트들 가져오기
  const posts: PostMeta[] = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, filename), 'utf-8');
    const { data: meta } = matter(markdownWithMeta);
    return {
      slug,
      title: meta.title,
      date: meta.date,
      category: meta.category,
      viewCount: 0,
      likeCount: 0,
    };
  });
  // 날짜 최신순 정렬
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // 포스트 반환
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: { posts: PostMeta[] }) {
  // 메타정보들 가져오는 훅
  const { postWithMeta, fetchPostMeta } = usePostMetas(posts);
  // 카테고리 필터 훅
  const { filteredPosts, changeCategory, value } = useCategory(postWithMeta);
  // 페이지네이션 필터 훅
  const { currentPosts, totalPages, currentPage, setCurrentPage } = usePagination(filteredPosts);

  useEffect(() => {
    fetchPostMeta();
  }, [filteredPosts]);

  return (
    <Box>
      {/* 카테고리 */}
      <Box display="flex" justifyContent="flex-start" my={1}>
        <Tabs
          value={value}
          onChange={(e, idx) => {
            changeCategory(e, idx);
            setCurrentPage(1);
          }}
        >
          {categories.map((category, idx) => (
            <Tab key={idx} label={category.title} />
          ))}
        </Tabs>
      </Box>
      {/* 포스트 리스트 */}
      <Container>
        {currentPosts.map((post, idx) => (
          <PostCard post={post} posts={currentPosts} key={idx} />
        ))}
      </Container>
      {/* 페이지네이션 */}
      <Box display="flex" justifyContent="center" my={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
