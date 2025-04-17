import { Box, Typography } from '@mui/material';

export const PostCardTitle = ({ post }: { post: PostMeta }) => {
  return (
    <Box position={'relative'} width={'100%'}>
      {/* 타이틀, 서브타이틀 */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          maxWidth: '95%',
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
        variant="subtitle1"
        color="textSecondary"
        gutterBottom
        sx={{
          maxWidth: '95%',
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
