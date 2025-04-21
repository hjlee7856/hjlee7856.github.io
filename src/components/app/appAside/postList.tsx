import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
export const PostList = ({
  title,
  posts,
  type,
}: {
  title: string;
  posts: PostMeta[];
  type: string;
}) => {
  const router = useRouter();
  return (
    <Card variant="outlined">
      <CardContent sx={{ pb: '16px !important' }}>
        <Typography variant="body2" color="textSecondary" fontWeight={'bold'} marginBottom={2}>
          {title}
        </Typography>
        <Box gap={1} display={'flex'} flexDirection={'column'}>
          {posts &&
            posts.map((post) => (
              <Box key={post.slug}>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    router.push(`/posts/${post.slug}`);
                  }}
                >
                  <Typography variant="body1" sx={{ maxWidth: '240px' }} noWrap>
                    {post.title}
                  </Typography>
                  {type === 'recent' && (
                    <Typography variant="body2" noWrap>
                      {post.createdAt.toLocaleDateString()}
                    </Typography>
                  )}
                  {type === 'mostView' && (
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
                  {type === 'popular' && (
                    <Box
                      display="flex"
                      gap={0.5}
                      alignItems="center"
                      justifyContent={'flex-end'}
                      width={'50px'}
                    >
                      <FavoriteIcon color="disabled" fontSize="small" />
                      <Typography variant="body2" color="textSecondary">
                        {post.likeCount}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <Divider />
              </Box>
            ))}
        </Box>
      </CardContent>
    </Card>
  );
};
