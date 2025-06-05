import { AboutSection } from '@/components/app/appAside/aboutSection';
import { PostList } from '@/components/app/appAside/postList';
import { Box } from '@mui/material';

interface AsideProps {
  mostViewPosts: PostMeta[];
  mostViewPostsLoading?: boolean;
  popularPosts: PostMeta[];
  popularPostsLoading?: boolean;
  recentPosts: PostMeta[];
  recentPostsLoading?: boolean;
  about: string;
}

const PostIndexAside = ({
  mostViewPosts,
  mostViewPostsLoading,
  popularPosts,
  popularPostsLoading,
  recentPosts,
  recentPostsLoading,
  about,
}: AsideProps) => {
  return (
    <Box
      component="aside"
      sx={{ width: 400, pt: 1, gap: 1, display: { xs: 'none', sm: 'flex' } }}
      flexDirection={'column'}
    >
      <AboutSection about={about} />
      <PostList
        title="인기 포스트"
        posts={popularPosts}
        type="popular"
        isLoading={popularPostsLoading}
      />
      <PostList
        title="최다조회 포스트"
        posts={mostViewPosts}
        type="mostView"
        isLoading={mostViewPostsLoading}
      />
      <PostList
        title="최근 포스트"
        posts={recentPosts}
        type="recent"
        isLoading={recentPostsLoading}
      />
    </Box>
  );
};

export default PostIndexAside;
