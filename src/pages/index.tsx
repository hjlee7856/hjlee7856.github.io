import { adminAutoLogin } from '@/utils/adminAuth';
import {
  Box,
  Card,
  CardContent,
  Container,
  Pagination,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import path from 'path';
import { useEffect, useState } from 'react';

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
};

const categories = [
  { title: '전체', categoryName: '' },
  { title: '개발 일지', categoryName: 'development' },
  { title: '에러 로그', categoryName: 'error' },
];

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));
  const posts: PostMeta[] = files.map((filename) => {
    const slug = filename.replace('.mdx', '');
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8');
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
  // 카테고리
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // 페이지당 표시할 포스트 수
  const changeCategory = (event: React.SyntheticEvent, idx: number) => {
    setValue(idx);
    setCategory(categories[idx].categoryName);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 리셋
  };
  // 카테고리 필터링 후 페이지네이션 적용
  const filteredPosts = posts.filter((post) => category === '' || post.category === category);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );
  // firebase 로그인

  useEffect(() => {
    adminAutoLogin();
  }, []);

  return (
    <Container sx={{ px: '0 !important', py: 0 }}>
      <Box display="flex" justifyContent="flex-start" my={2}>
        <Tabs value={value} onChange={changeCategory}>
          {categories.map((category) => (
            <Tab key={category.categoryName} label={category.title} />
          ))}
        </Tabs>
      </Box>

      {currentPosts.map((post) => (
        <Link
          href={`/posts/${post.slug}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
          key={post.slug}
        >
          <Card
            variant="outlined"
            sx={{
              my: 2,
              borderRadius: '8px',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {post.date}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}

      {/* MUI Pagination 컴포넌트 */}
      <Box display="flex" justifyContent="center" my={3}>
        <Pagination
          count={totalPages} // 총 페이지 수
          page={currentPage} // 현재 페이지
          onChange={(event, value) => setCurrentPage(value)} // 페이지 변경 시
          color="primary"
          shape="rounded"
        />
      </Box>
    </Container>
  );
}
