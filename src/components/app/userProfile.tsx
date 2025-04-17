import DropDownMenu from '@/components/dropdownMenu';
import { logoutWithGoogle, signInWithGoogle } from '@/firestore/auth';
import useUserStore from '@/store/userStore';
import { Avatar, Box, Button, MenuItem, Typography } from '@mui/material';
import Image from 'next/image';

export const UserProfile = ({ bar = false }: { bar?: boolean }) => {
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
    <>
      {/* 비 로그인 */}
      {!isLoggedIn && (
        <Box
          display="flex"
          alignItems={'center'}
          gap={1}
          onClick={handleLogin}
          sx={{ cursor: 'pointer' }}
        >
          {bar ? (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: '160px',
                  height: '32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image src={'/image/img_google_login.png'} alt="구글 로그인" fill priority />
              </Box>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  width: '32px',
                  height: '32px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={'/image/icon_google_login.png'}
                  alt="구글 로그인"
                  fill
                  sizes="32px"
                  priority
                />
              </Box>
              <Typography>로그인</Typography>
            </>
          )}
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
                component={Button}
                sx={{
                  textDecoration: 'none',
                  color: 'inherit',
                  py: { xs: 0, sm: 1.5 },
                }}
              >
                로그아웃
              </MenuItem>,
            ]}
          />
        </Box>
      )}
    </>
  );
};
