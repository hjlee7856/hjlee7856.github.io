import { Box, Card, CardContent, Typography } from '@mui/material';

export const PostListCard = ({
  post,
  postMetas,
}: {
  post: PostMeta;
  postMetas: FireStorePostMeta;
}) => {
  const meta = postMetas?.[post.slug];
  return (
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
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="textSecondary">
            조회수: {meta?.views || 0}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            좋아요: {meta?.likes || 0}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
