import { PostCard } from '@/components/postCard/postCard';
import { Container } from '@mui/material';

export const PostCardList = ({ filteredPosts }: { filteredPosts: PostMeta[] }) => {
  return (
    <Container sx={{ paddingX: '0 !important' }}>
      {filteredPosts.map((post, idx) => (
        <PostCard post={post} key={idx} />
      ))}
    </Container>
  );
};
