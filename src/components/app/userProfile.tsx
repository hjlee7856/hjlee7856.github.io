import DropDownMenu from '@/components/dropdownMenu';
import { logoutWithGoogle } from '@/firestore/auth';
import useUserStore from '@/store/userStore';
import { Avatar, Box, Button, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Props {
  handleDrawer?: () => void;
}

export const UserProfile = (props: Props) => {
  const { user, isLoggedIn } = useUserStore();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
    if (props.handleDrawer) props.handleDrawer();
  };

  const handleLogout = async () => {
    try {
      await logoutWithGoogle();
      if (props.handleDrawer) props.handleDrawer();
    } catch (error: any) {
      console.error('❌ 로그아웃 실패:', error?.code, error?.message, error);
    }
  };

  return (
    <>
      {/* 비 로그인 */}
      {!isLoggedIn && (
        <Box
          onClick={handleLogin}
          display="flex"
          alignItems={'center'}
          gap={1}
          sx={{ cursor: 'pointer' }}
        >
          <Typography>로그인</Typography>
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
