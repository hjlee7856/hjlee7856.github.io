import { Box } from '@mui/material';
import Image from 'next/image';

export const PostCardThumbnail = ({ post }: { post: PostMeta }) => {
  return (
    <Box
      width={160}
      height={90}
      position={'relative'}
      borderRadius={'8px'}
      overflow={'hidden'}
      sx={{ margin: { xs: 0, sm: 1 } }}
    >
      <Image src={post.thumbnail} alt={'썸네일 이미지'} fill />
    </Box>
  );
};
