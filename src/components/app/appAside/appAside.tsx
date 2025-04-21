import { AboutSection } from '@/components/app/appAside/aboutSection';
import { PostList } from '@/components/app/appAside/postList';
import { Box } from '@mui/material';

interface AsideProps {
  popularPosts: PostMeta[];
  recentPosts: PostMeta[];
  about: string;
}

const PostIndexAside = ({ popularPosts, recentPosts, about }: AsideProps) => {
  return (
    <Box
      component="aside"
      sx={{ width: 400, pt: 1, gap: 1, display: { xs: 'none', sm: 'flex' } }}
      flexDirection={'column'}
    >
      <AboutSection about={about} />
      <PostList title="인기 포스트" posts={popularPosts} type="popular" />
      <PostList title="최근 포스트" posts={recentPosts} type="recent" />
    </Box>
  );
};

export default PostIndexAside;
