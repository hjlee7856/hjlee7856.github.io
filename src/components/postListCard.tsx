import { usePost } from '@/hooks/usePost';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Card, CardContent, Typography } from '@mui/material';

export const PostListCard = ({
  post,
  postMetas,
}: {
  post: PostMeta;
  postMetas: FireStorePostMetas;
}) => {
  const meta = postMetas?.[post.slug];
  const { handleLike, likeActive } = usePost(post.slug, meta);
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
        <Typography variant="h5" color="grey.900" fontWeight={'bold'} gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="h6" color="grey.500" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {post.date}
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          {/* 조회수 */}
          <Box display="flex" gap={0.5} alignItems="center">
            <VisibilityIcon color="disabled" fontSize="small" />
            <Typography variant="body2" color="textSecondary">
              {meta?.views || 0}
            </Typography>
          </Box>
          {/* 좋아요 */}
          <Box display="flex" gap={0.5} alignItems="center" onClick={handleLike}>
            {likeActive ? (
              <FavoriteIcon color="disabled" fontSize="small" />
            ) : (
              <FavoriteBorderIcon color="disabled" fontSize="small" />
            )}
            <Typography variant="body2" color="textSecondary">
              {meta?.likes || 0}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
