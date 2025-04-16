import { PostCardMeta } from '@/components/postCard/postCardMeta';
import { PostCardThumbnail } from '@/components/postCard/postCardThumbnail';
import { PostCardTitle } from '@/components/postCard/postCardTitle';

import { Box, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';

export const PostCard = ({ post }: { post: PostMeta }) => {
  const router = useRouter();

  return (
    <Card
      variant="outlined"
      sx={{
        my: 1,
        borderRadius: '8px',
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => router.push(`/posts/${post.slug}`)}
    >
      <CardContent sx={{ pb: '16px !important' }}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box
            flex={1}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            mr={2}
          >
            <PostCardTitle post={post} />
            <PostCardMeta post={post} />
          </Box>
          <PostCardThumbnail post={post} />
        </Box>
      </CardContent>
    </Card>
  );
};
