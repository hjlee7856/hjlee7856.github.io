import PostIndexAside from '@/components/app/appAside';
import { CategoryTab } from '@/components/categoryTab';
import LoadingOverlay from '@/components/loadingOverlay';
import { PostCardList } from '@/components/postList/postCardList';
import { files, postsDirectory } from '@/constants/files';
import { useCategory } from '@/hooks/useCategory';
import { usePagination } from '@/hooks/usePagenation';
import { usePopularPosts } from '@/hooks/usePopularPosts';
import { useRecentPosts } from '@/hooks/usePopularPosts copy';
import { usePostMetaMap } from '@/hooks/usePostMetaMap';
import { Box, Pagination } from '@mui/material';
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
  const { filteredPosts, changeCategory, selectIdx } = useCategory(postWithMeta);
  // 최다 조회글
  const { popularPosts } = usePopularPosts();
  // 최근 작성글
  const { recentPosts } = useRecentPosts();

  if (!posts) return <LoadingOverlay />;

  return (
    <Box display={'flex'}>
      <Box>
        {/* 카테고리 */}
        <CategoryTab
          changeCategory={changeCategory}
          setCurrentPage={setCurrentPage}
          value={selectIdx}
        />
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
      </Box>
      {/* Aside */}
      <PostIndexAside
        popularPosts={popularPosts}
        recentPosts={recentPosts}
        about="이 블로그는 프론트엔드 개발 지식을 공유합니다."
      />
    </Box>
  );
}
