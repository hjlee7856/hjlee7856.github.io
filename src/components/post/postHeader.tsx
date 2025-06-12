import { Box, Chip, Divider, Typography } from '@mui/material';
import Image from 'next/image';

export const PostHeader = ({ postMeta }: { postMeta: PostMeta }) => {
  return (
    <Box mt={4} mb={8}>
      {/* 썸네일 16:9 */}
      <Box
        width="100%"
        height="300px"
        position={'relative'}
        borderRadius={'16px'}
        overflow={'hidden'}
        mb={4}
      >
        <Image src={postMeta.thumbnail} alt={'썸네일 이미지'} fill style={{ objectFit: 'cover' }} />
      </Box>
      {/* 타이틀 */}
      <Typography
        variant="h5"
        fontWeight={'bold'}
        gutterBottom
        sx={{
          maxWidth: '100%',
          wordBreak: 'break-word',
        }}
      >
        {postMeta.title}
      </Typography>
      {/* 태그 */}
      <Box display={'flex'} gap={1} mb={4}>
        {postMeta.tags.map((tag, idx) => (
          <Chip key={idx} label={tag} />
        ))}
      </Box>
      {/* 작성자, 작성일 */}
      <Box mb={2}>
        <Typography variant="body1" fontWeight={'bold'}>
          {postMeta.author}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {postMeta.createdAt.toLocaleString()}
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
};
