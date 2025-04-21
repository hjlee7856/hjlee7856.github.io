import { PostCardMeta } from '@/components/postList/postCardMeta';
import { PostCardThumbnail } from '@/components/postList/postCardThumbnail';
import { PostCardTitle } from '@/components/postList/postCardTitle';

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
        <Box display={'flex'} justifyContent={'space-between'} minWidth={''}>
          <Box
            flex={1}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            sx={{ mr: { xs: 0, sm: 2 } }}
          >
            <Box
              sx={{ display: { xs: 'flex' }, flex: { xs: '1' }, flexDirection: { xs: 'row' } }}
              justifyContent={'space-between'}
            >
              <PostCardTitle post={post} />
              {/* 모바일 썸네일 */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
                <PostCardThumbnail post={post} />
              </Box>
            </Box>
            <PostCardMeta post={post} />
          </Box>
          {/* PC 썸네일 */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
            }}
          >
            <PostCardThumbnail post={post} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
