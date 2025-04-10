// pages/index.tsx

import { Box, Card, CardContent, Container, Tab, Tabs, Typography } from '@mui/material';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import path from 'path';
import { useState } from 'react';

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
};

const categories = [
  { title: '전체', categoryName: '' },
  { title: '에러 로그', categoryName: 'errorLog' },
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
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);

  return (
    <Container sx={{ px: '0 !important', py: 0 }}>
      <Box display="flex" justifyContent="flex-start" my={2}>
        <Tabs
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
            setCategory(categories[newValue].categoryName);
          }}
        >
          {categories.map((category) => (
            <Tab key={category.categoryName} label={category.title} />
          ))}
        </Tabs>
      </Box>

      {posts
        .filter((post) => {
          if (category === '') return post;
          return post.category === category;
        })
        .map((post) => (
          <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card
              variant="outlined"
              key={post.slug}
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
    </Container>
  );
}
