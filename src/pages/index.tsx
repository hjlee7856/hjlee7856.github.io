import PostIndexAside from '@/components/app/appAside/appAside';
import LoadingOverlay from '@/components/loadingOverlay';
import { CategoryTab } from '@/components/postList/categoryTab';
import { PostCardList } from '@/components/postList/postCardList';
import PostListSkeleton from '@/components/postList/postListSkeleton';
import { files, postsDirectory } from '@/constants/files';
import { useCategory } from '@/hooks/useCategory';
import { useMostViewPosts } from '@/hooks/useMostViewPosts';
import { usePagination } from '@/hooks/usePagenation';
import { usePopularPosts } from '@/hooks/usePopularPosts';
import { usePostMetaMap } from '@/hooks/usePostMetaMap';
import { useRecentPosts } from '@/hooks/useRecentPosts';
import { Box, Divider, Pagination } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export async function getStaticProps() {
  // 포스트들 가져오기
  const posts: any[] = files.map((filename) => {
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

  // 카테고리 추출 (중복 제거)
  const categorySet = new Set(posts.map((post) => post.category || '기타'));
  const categories = ['전체', ...Array.from(categorySet)];

  // 포스트 반환
  return {
    props: {
      posts,
      categories,
    },
  };
}

export default function Blog({ posts, categories }: { posts: PostMeta[]; categories: string[] }) {
  // 페이지네이션 필터 훅
  const { currentPage, setCurrentPage, totalPages, perPage } = usePagination(posts.length);
  // 메타정보들 가져오는 훅
  const { postWithMeta, isLoading } = usePostMetaMap(posts, currentPage, perPage);
  // 카테고리 필터 훅
  const { filteredPosts, changeCategory, selectIdx } = useCategory(postWithMeta, categories);
  // 인기 작성글
  const { popularPosts, isLoading: popularPostsLoading } = usePopularPosts();
  // 최근 작성글
  const { recentPosts, isLoading: recentPostsLoading } = useRecentPosts();
  // 최다 조회글
  const { mostViewPosts, isLoading: mostViewPostsLoading } = useMostViewPosts();

  if (!posts) return <LoadingOverlay />;

  return (
    <Box display={'flex'}>
      <Box flex={1}>
        {/* 카테고리 */}
        <CategoryTab
          categories={categories}
          changeCategory={changeCategory}
          setCurrentPage={setCurrentPage}
          value={selectIdx}
        />
        {isLoading ? <PostListSkeleton /> : <PostCardList filteredPosts={filteredPosts} />}
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
      {/* 세로 Divider */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 3, display: { xs: 'none', sm: 'block' } }}
      />
      {/* Aside */}
      <PostIndexAside
        popularPosts={popularPosts}
        popularPostsLoading={popularPostsLoading}
        mostViewPosts={mostViewPosts}
        mostViewPostsLoading={mostViewPostsLoading}
        recentPosts={recentPosts}
        recentPostsLoading={recentPostsLoading}
      />
    </Box>
  );
}
