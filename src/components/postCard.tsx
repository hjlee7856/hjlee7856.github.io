import { usePost as useLike } from '@/hooks/usePostCard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const PostCard = ({ post }: { post: PostMeta }) => {
  const router = useRouter();
  const { handleLike, likeActive } = useLike(post);

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
        <Typography variant="body1" color="grey.500" gutterBottom>
          {post.subTitle}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {post.createdAt.toDate().toLocaleString()}
        </Typography>
        <Typography variant="body1" color="grey.900" gutterBottom>
          {post.author}
        </Typography>
        <Typography variant="body1" color="grey.900" gutterBottom>
          {post.category}
        </Typography>
        <Image src={post.thumbnail} alt={'썸네일 이미지'} width={150} height={150} />

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
