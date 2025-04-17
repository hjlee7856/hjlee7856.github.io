import { Box, Typography } from '@mui/material';

export const PostCardTitle = ({ post }: { post: PostMeta }) => {
  return (
    <Box>
      {/* 타이틀, 서브타이틀 */}
      <Typography
        variant="h5"
        color="textPrimary"
        fontWeight={'bold'}
        gutterBottom
        sx={{
          maxWidth: '100%',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {post.title}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        gutterBottom
        sx={{
          maxWidth: '100%',
          wordBreak: 'break-word',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {post.subTitle}
      </Typography>
    </Box>
  );
};
