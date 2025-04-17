import { Box } from '@mui/material';
import Image from 'next/image';

export const PostCardThumbnail = ({ post }: { post: PostMeta }) => {
  return (
    <Box
      position={'relative'}
      borderRadius={'8px'}
      overflow={'hidden'}
      sx={{
        width: { xs: '120px', sm: '180px' }, // 모바일: 120px, PC: 180px
        height: { xs: '67.5px', sm: '101.25px' }, // 16:9 비율 유지
        flexShrink: 0, // 줄어들지 않게
        margin: { xs: 0, sm: 1 },
      }}
    >
      <Image src={post.thumbnail} alt={'썸네일 이미지'} fill />
    </Box>
  );
};
