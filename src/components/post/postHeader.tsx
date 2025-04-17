import { Box, Chip, Divider, Typography } from '@mui/material';
import Image from 'next/image';

export const PostHeader = ({ postMeta }: { postMeta: PostMeta }) => {
  return (
    <Box mt={4} mb={8}>
      {/* 썸네일 */}
      <Box
        width="100%"
        paddingTop="56.25%"
        position={'relative'}
        borderRadius={'16px'}
        overflow={'hidden'}
        mb={4}
      >
        <Image src={postMeta.thumbnail} alt={'썸네일 이미지'} fill style={{ objectFit: 'cover' }} />
      </Box>
      {/* 타이틀 */}
      <Typography variant="h3" fontWeight={'bold'} gutterBottom>
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
        <Typography variant="body1">{postMeta.author}</Typography>
        <Typography variant="body2" color="textSecondary">
          {postMeta.createdAt.toDate().toLocaleString()}
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
};
