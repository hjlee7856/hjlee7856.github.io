import { GithubLoginButton } from '@/components/login/githubLoginButton';
import { GoogleLoginButton } from '@/components/login/googleLoginButton';
import { PageLayout } from '@/components/pageLayout';
import { Box } from '@mui/material';

const LoginPage = () => {
  return (
    <PageLayout title={'로그인'}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} mt={3}>
        <GoogleLoginButton />
        <GithubLoginButton />
      </Box>
    </PageLayout>
  );
};

export default LoginPage;
