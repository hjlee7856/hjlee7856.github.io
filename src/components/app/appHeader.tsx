import { AppLogo } from '@/components/app/appLogo';
import MobileNav from '@/components/app/mobileNav';

import { UserProfile } from '@/components/app/userProfile';
import { AppBar, Box, Container, Divider, Toolbar } from '@mui/material';

export const AppHeader = () => {
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
            {/* 프로필 */}
            <UserProfile />
          </Box>
        </Container>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
