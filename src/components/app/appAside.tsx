import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

type AsideProps = {
  popularPosts: PostMeta[];
  recentPosts: PostMeta[];
  about: string;
};

const AboutSection = ({ about }: { about: string }) => (
  <Card variant="outlined">
    <CardHeader title="소개글" sx={{ pb: 0 }} />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {about}
      </Typography>
    </CardContent>
  </Card>
);

const PostList = ({ title, posts, type }: { title: string; posts: PostMeta[]; type: string }) => {
  const router = useRouter();
  return (
    <Card variant="outlined">
      <CardHeader title={title} sx={{ pb: 0 }} />
      <CardContent sx={{ pb: '16px !important' }}>
        <Box gap={1} display={'flex'} flexDirection={'column'}>
          {posts &&
            posts.map((post) => (
              <Box
                key={post.slug}
                display={'flex'}
                justifyContent={'space-between'}
                sx={{ cursor: 'pointer' }}
              >
                <Link href={`/posts/${post.slug}`}>
                  <Typography variant="body1" sx={{ width: '150px' }} noWrap>
                    {post.title}
                  </Typography>
                </Link>
                {type === 'recent' && (
                  <Typography variant="body2" noWrap>
                    {post.createdAt.toLocaleString()}
                  </Typography>
                )}
                {type === 'popular' && (
                  <Box
                    display="flex"
                    gap={0.5}
                    alignItems="center"
                    justifyContent={'flex-end'}
                    width={'50px'}
                  >
                    <VisibilityIcon color="disabled" fontSize="small" />
                    <Typography variant="body2" color="textSecondary">
                      {post.viewCount}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
        </Box>
      </CardContent>
    </Card>
  );
};

const PostIndexAside: React.FC<AsideProps> = ({ popularPosts, recentPosts, about }) => {
  return (
    <Box
      component="aside"
      sx={{ width: 400, p: 2, pt: 0, gap: 1, display: { xs: 'none', sm: 'flex' } }}
      flexDirection={'column'}
    >
      <AboutSection about={about} />
      <PostList title="인기 포스트" posts={popularPosts} type="popular" />
      <PostList title="최근 포스트" posts={recentPosts} type="recent" />
    </Box>
  );
};

export default PostIndexAside;
