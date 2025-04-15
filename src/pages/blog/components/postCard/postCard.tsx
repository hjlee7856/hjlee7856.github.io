import { usePost } from '@/pages/blog/components/postCard/usePostCard';
import { usePostMetas } from '@/pages/blog/hooks/useMetas';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export const PostCard = ({ post, posts }: { post: PostMeta; posts: PostMeta[] }) => {
  const router = useRouter();
  const { handleLike, likeActive } = usePost(post);
  const { fetchPostMeta } = usePostMetas(posts);

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
      onClick={() => router.push(`/blog/posts/${post.slug}`)}
    >
      <CardContent>
        <Typography variant="h5" color="grey.900" fontWeight={'bold'} gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="h6" color="grey.500" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          작성일: {post.date}
        </Typography>

        <Box display="flex" gap={1} alignItems="center" zIndex={2}>
          {/* 조회수 */}
          <Box display="flex" gap={0.5} alignItems="center">
            <VisibilityIcon color="disabled" fontSize="small" />
            <Typography variant="body2" color="textSecondary">
              {post.viewCount}
            </Typography>
          </Box>

          {/* 좋아요 */}
          <Box
            display="flex"
            gap={0.5}
            alignItems="center"
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
              fetchPostMeta();
            }}
          >
            {likeActive ? (
              <FavoriteIcon color="disabled" fontSize="small" />
            ) : (
              <FavoriteBorderIcon color="disabled" fontSize="small" />
            )}
            <Typography variant="body2" color="textSecondary">
              {post.likeCount}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
