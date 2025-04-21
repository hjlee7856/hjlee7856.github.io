import { useCategory } from '@/hooks/useCategory';
import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const AppLogo = () => {
  const { changeCategory } = useCategory();
  return (
    <Link
      href={`/`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      onClick={(e) => {
        changeCategory(e, 0);
      }}
    >
      <Box sx={{ position: 'relative', width: '90px', height: '50px' }}>
        <Image src="/image/img_Logo_B.png" alt="로고" fill />
      </Box>
    </Link>
  );
};
