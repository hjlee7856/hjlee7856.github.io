import { GithubLoginButton } from '@/components/login/githubLoginButton';
import { GoogleLoginButton } from '@/components/login/googleLoginButton';
import { Box, Typography } from '@mui/material';

const Login = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} mt={22}>
      <Typography variant="h4" fontWeight={'bold'}>
        로그인
      </Typography>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} mt={3}>
        <GoogleLoginButton />
        <GithubLoginButton />
      </Box>
    </Box>
  );
};

export default Login;
