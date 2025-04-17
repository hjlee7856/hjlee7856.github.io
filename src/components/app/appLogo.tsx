import { Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const AppLogo = () => {
  return (
    <Link href={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box sx={{ position: 'relative', width: '90px', height: '50px' }}>
        <Image src="/image/img_Logo_B.png" alt="로고" fill />
      </Box>
    </Link>
  );
};
