import LoadingOverlay from '@/components/loadingOverlay';
import { PostCardList } from '@/components/postList/postCardList';
import { categories } from '@/constants/categorys';
import { files, postsDirectory } from '@/constants/files';
import { useCategory } from '@/hooks/useCategory';
import { usePagination } from '@/hooks/usePagenation';
import { usePostMetaMap } from '@/hooks/usePostMetaMap';
import { Box, Container, Pagination, Tab, Tabs } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export async function getStaticProps() {
  // 포스트들 가져오기
  const posts: PostMeta[] = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, filename), 'utf-8');
    const { data: meta } = matter(markdownWithMeta);
    return {
      slug,
      title: meta.title,
      subTitle: meta.subTitle,
      author: meta.author,
      thumbnail: meta.thumbnail,
      tags: String(meta.tags).split(','),
      createdAt: new Date().toISOString(),
      category: meta.category,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
    };
  });

  // 포스트 반환
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: { posts: PostMeta[] }) {
  // 페이지네이션 필터 훅
  const { currentPage, setCurrentPage, totalPages, perPage } = usePagination(posts.length);
  // 메타정보들 가져오는 훅
  const { postWithMeta } = usePostMetaMap(posts, currentPage, perPage);
  // 카테고리 필터 훅
  const { filteredPosts, changeCategory, value } = useCategory(postWithMeta);

  if (!posts) return <LoadingOverlay />;

  // 정렬
  if (filteredPosts.length > 0) {
    filteredPosts
      .filter((post) => post.createdAt && typeof post.createdAt.toDate === 'function')
      .sort((a, b) => {
        const timeA = a.createdAt.toDate().getTime() ?? 0;
        const timeB = b.createdAt.toDate().getTime() ?? 0;
        return timeB - timeA;
      });
  }

  return (
    <Container>
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
            <Tab key={idx} label={category.categoryName} />
          ))}
        </Tabs>
      </Box>
      {/* 포스트 리스트 */}
      <PostCardList filteredPosts={filteredPosts} />
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
    </Container>
  );
}
