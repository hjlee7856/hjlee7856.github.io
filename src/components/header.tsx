import DropDownMenu from '@/components/dropdownMenu';
import { logoutWithGoogle, signInWithGoogle } from '@/firestore/auth';
import useUserStore from '@/store/userStore';
import { AppBar, Avatar, Box, MenuItem, Toolbar, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  const { user, isLoggedIn } = useUserStore();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      // 로그인 후 처리 (예: 라우팅, 상태 저장 등)
    } catch (e) {
      alert('로그인 중 에러가 발생했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutWithGoogle();
    } catch (error: any) {
      console.error('❌ 로그아웃 실패:', error?.code, error?.message, error);
    }
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
          {/* 타이틀 */}
          <Link href={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" color="inherit">
              블로그
            </Typography>
          </Link>
          {/* 비 로그인 */}
          {!isLoggedIn && (
            <Box>
              <Link href={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Image
                  src={'/image/icon_google_login.png'}
                  alt="구글 로그인"
                  width={32}
                  height={32}
                  onClick={handleLogin}
                  style={{ bottom: '-4px', position: 'relative' }}
                />
              </Link>
            </Box>
          )}
          {/* 로그인 */}
          {isLoggedIn && (
            <Box
              display={'flex'}
              flexDirection={'row'}
              gap="8px"
              alignItems={'center'}
              justifyContent={'center'}
            >
              <DropDownMenu
                menuBtn={<Avatar alt={user?.name ?? ''} src={user?.photo ?? ''} />}
                menuItem={[
                  <MenuItem
                    key="logout"
                    onClick={handleLogout}
                    component={Link}
                    href="/blog"
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    로그아웃
                  </MenuItem>,
                ]}
              />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
