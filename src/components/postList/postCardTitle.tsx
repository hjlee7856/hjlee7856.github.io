import { Box, Typography } from '@mui/material';

export const PostCardTitle = ({ post }: { post: PostMeta }) => {
  return (
    <Box>
      {/* 타이틀, 서브타이틀 */}
      <Typography variant="h5" color="textPrimary" fontWeight={'bold'} gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        {post.subTitle}
      </Typography>
    </Box>
  );
};
