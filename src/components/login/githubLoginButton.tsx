import { signInFireAuth } from '@/firestore/auth';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const GithubLoginButton = () => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      if (await signInFireAuth('github')) router.back();
    } catch (e) {
      alert('로그인 중 에러가 발생했습니다.');
    }
  };

  return (
    <Button
      onClick={handleLogin}
      sx={{
        border: '1px solid black',
        width: { xs: '200px', sm: '240px' },
        height: '40px',
        color: 'black',
      }}
      startIcon={
        <Box width={'24px'} height={'24px'} sx={{ position: 'relative', overflow: 'hidden' }}>
          <Image src={'/image/icn_Github.png'} alt="깃헙 로그인" fill priority />
        </Box>
      }
    >
      <Typography variant="body1">깃헙 로그인</Typography>
    </Button>
  );
};
