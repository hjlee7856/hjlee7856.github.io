import { PostListCard } from '@/components/postListCard';
import { categories } from '@/constants/category';
import { postsDirectory } from '@/constants/directory';
import { useCategory } from '@/hooks/useCategory';
import { useFireMeta } from '@/hooks/useFireMeta';
import { usePagination } from '@/hooks/usePagenation';
import { Box, Container, Pagination, Tab, Tabs } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import path from 'path';

export async function getStaticProps() {
  const files = fs.readdirSync(postsDirectory);
  const posts: PostMeta[] = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const markdownWithMeta = fs.readFileSync(path.join(postsDirectory, filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      category: frontmatter.category,
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
  // 카테고리 커스텀 훅
  const { filteredPosts, changeCategory, value } = useCategory(posts);
  // 페이지네이션 커스텀 훅
  const { currentPosts, totalPages, currentPage, setCurrentPage } = usePagination(filteredPosts);
  // 파이어스토어에 저장된 메타정보 가져오는 훅
  const { fireMetas } = useFireMeta(posts);

  return (
    <Container sx={{ px: '0 !important', py: 0 }}>
      {/* 카테고리 */}
      <Box display="flex" justifyContent="flex-start" my={2}>
        <Tabs
          value={value}
          onChange={(e, idx) => {
            changeCategory(e, idx);
            setCurrentPage(1);
          }}
        >
          {categories.map((category) => (
            <Tab key={category.categoryName} label={category.title} />
          ))}
        </Tabs>
      </Box>
      {/* 포스트 리스트 */}
      {currentPosts.map((post) => (
        <Link
          href={`/posts/${post.slug}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
          key={post.slug}
        >
          <PostListCard post={post} postMetas={fireMetas} />
        </Link>
      ))}
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
