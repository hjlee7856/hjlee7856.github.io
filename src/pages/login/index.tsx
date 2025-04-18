import { GithubLoginButton } from '@/components/login/githubLoginButton';
import { GoogleLoginButton } from '@/components/login/googleLoginButton';
import { Box, Typography } from '@mui/material';

const Login = () => {
  return (
    <Box
      width={'100%'}
      height={'66vh'}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      mt={20}
      overflow={'hidden'}
    >
      <Typography variant="h4" fontWeight={'bold'}>
        로그인
      </Typography>
      <GoogleLoginButton />
      <GithubLoginButton />
    </Box>
  );
};

export default Login;
