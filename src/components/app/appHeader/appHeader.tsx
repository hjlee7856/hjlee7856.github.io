import { AppLogo } from '@/components/app/appHeader/appLogo';
import MobileNav from '@/components/app/appHeader/mobileNav';

import { UserProfile } from '@/components/app/appHeader/userProfile';
import useModalStore from '@/store/modalStore';
import useUserStore from '@/store/userStore';
import { AppBar, Box, Container, Divider, Link, Toolbar } from '@mui/material';

export const AppHeader = () => {
  const { isLoggedIn } = useUserStore();
  const { setLoginModalOpen } = useModalStore();
  return (
    <AppBar color="inherit" sx={{ boxShadow: 'none' }}>
      <Toolbar>
        <Container maxWidth="lg">
          <Box
            position="sticky"
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            width={'100%'}
          >
            {/* 모바일 네비게이션 */}
            <MobileNav />
            {/* 로고 */}
            <AppLogo />
            <Box display={'flex'} gap={2} alignItems={'center'}>
              {/* 유틸리티 링크 */}
              <Link
                href="/utils"
                color="text.secondary"
                underline="hover"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                유틸리티
              </Link>
              {/* 로그인 링크 */}
              {!isLoggedIn && (
                <Link
                  component="button"
                  color="text.secondary"
                  underline="hover"
                  onClick={() => setLoginModalOpen(true)}
                  sx={{ cursor: 'pointer' }}
                >
                  로그인
                </Link>
              )}
              {/* 프로필 */}
              <UserProfile />
            </Box>
          </Box>
        </Container>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
