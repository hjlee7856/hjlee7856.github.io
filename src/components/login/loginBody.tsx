import { LoginButton } from '@/components/login/LoginButton';
import useModalStore from '@/store/modalStore';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Card, IconButton, Typography } from '@mui/material';

const LoginBody = () => {
  const { setLoginModalOpen } = useModalStore();

  return (
    <Card
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 4,
        py: 8,
        minWidth: 300,
      }}
    >
      {/* 닫기 버튼 (오른쪽 상단) */}
      <IconButton
        onClick={() => setLoginModalOpen(false)}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <CloseIcon />
      </IconButton>

      {/* 타이틀 */}
      <Typography variant="h4" fontWeight={'bold'}>
        로그인
      </Typography>

      {/* 로그인 버튼들 */}
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} mt={3}>
        <LoginButton title={'구글'} type={'google'} />
        <LoginButton title={'깃헙'} type={'github'} />
      </Box>
    </Card>
  );
};

export default LoginBody;
