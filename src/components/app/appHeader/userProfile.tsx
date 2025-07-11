import DropDownMenu from '@/components/dropdownMenu';
import { logoutWithFireAuth } from '@/firestore/auth';
import { deleteUser } from '@/firestore/user';
import useUserStore from '@/store/userStore';
import { Avatar, Box, IconButton, MenuItem } from '@mui/material';

interface Props {
  handleDrawer?: () => void;
}

export const UserProfile = (props: Props) => {
  const { user } = useUserStore();

  const handleLogout = async () => {
    try {
      await logoutWithFireAuth();
      if (props.handleDrawer) props.handleDrawer();
    } catch (error: any) {
      console.error('❌ 로그아웃 실패:', error?.code, error?.message, error);
    }
  };

  return (
    user && (
      <Box
        display={'flex'}
        flexDirection={'row'}
        gap="8px"
        alignItems={'center'}
        justifyContent={'center'}
      >
        <DropDownMenu
          menuBtn={
            <IconButton>
              <Avatar src={user?.photoURL ?? ''} alt={user?.displayName ?? ''} />
            </IconButton>
          }
          menuItems={[
            <MenuItem key="logout" onClick={handleLogout}>
              로그아웃
            </MenuItem>,
            <MenuItem
              key="signout"
              onClick={() => {
                deleteUser(user);
              }}
            >
              회원탈퇴
            </MenuItem>,
          ]}
        />
      </Box>
    )
  );
};
