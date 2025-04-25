import { signInFireAuth } from '@/firestore/auth';
import useModalStore from '@/store/modalStore';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';

interface Props {
  title: string;
  type: string;
}

export const LoginButton = (props: Props) => {
  const { setLoginModalOpen } = useModalStore();
  const handleLogin = async () => {
    try {
      if (await signInFireAuth(props.type)) setLoginModalOpen(false);
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
        <Box
          width={'24px'}
          height={'24px'}
          sx={{ display: 'inline-block', position: 'relative', overflow: 'hidden' }}
        >
          {props.type === 'google' && (
            <Image src={'/image/icn_Google.png'} alt={`${props.title} 로그인`} fill priority />
          )}
          {props.type === 'github' && (
            <Image src={'/image/icn_Github.png'} alt={`${props.title} 로그인`} fill priority />
          )}
        </Box>
      }
    >
      <Typography variant="body1">{`${props.title} 로그인`}</Typography>
    </Button>
  );
};
