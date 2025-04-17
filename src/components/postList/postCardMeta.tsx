import { useLike } from '@/hooks/useLike';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

export const PostCardMeta = ({ post }: { post: PostMeta }) => {
  const { handleLike, likeActive } = useLike(post);

  return (
    <Box display="flex" justifyContent={'space-between'} sx={{ marginTop: { xs: 2, sm: 0 } }}>
      {/* 작성자, 작성일 */}
      <Box display="flex" gap={0.5} alignItems="center">
        <Typography variant="body2" color="textSecondary">
          {post.createdAt && dayjs(post.createdAt.toDate()).format('YYYY년 MM월 DD일')}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          •
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.author}
        </Typography>
      </Box>
      {/* 조회수, 좋아요, 댓글 */}
      <Box display="flex" gap={1} alignItems="center">
        <Box display="flex" gap={0.5} alignItems="center">
          <VisibilityIcon color="disabled" fontSize="small" />
          <Typography variant="body2" color="textSecondary">
            {post.viewCount}
          </Typography>
        </Box>
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
        <Box display="flex" gap={0.5} alignItems="center">
          <CommentIcon color="disabled" fontSize="small" />
          <Typography variant="body2" color="textSecondary">
            {post.commentCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
