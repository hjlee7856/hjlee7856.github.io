import { UserProfile } from '@/components/userProfile';
import { categories } from '@/constants/categorys';
import { useCategory } from '@/hooks/useCategory';
import useUserStore from '@/store/userStore';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/navigation';
import * as React from 'react';

export default function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { changeCategory } = useCategory();
  const { user } = useUserStore();
  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleCategory = (e: React.SyntheticEvent, idx: number) => {
    changeCategory(e, idx);
    router.push('/');
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography ml={1} variant="subtitle1" fontWeight="bold">
        회원정보
      </Typography>
      {/* 프로필 */}
      <Box display={'flex'} flex={1} gap={1} alignItems={'center'} py={1} ml={2}>
        <UserProfile handleDrawer={toggleDrawer(false)} />
        {user?.displayName && <Typography>{user?.displayName}님 안녕하세요.</Typography>}
        {!user && (
          <Link href="/login" color="black" underline="hover">
            로그인
          </Link>
        )}
      </Box>
      <Divider />
      {/* 카테고리 */}
      <List onClick={toggleDrawer(false)}>
        <Typography ml={1} variant="subtitle1" fontWeight="bold">
          카테고리
        </Typography>
        {categories.map((category, idx) => (
          <ListItem key={idx} disablePadding>
            <ListItemButton onClick={(e) => handleCategory(e, idx)}>
              <ListItemText primary={category.categoryName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* 약관 */}
      <List onClick={toggleDrawer(false)}>
        <Typography ml={1} variant="subtitle1" fontWeight="bold">
          약관
        </Typography>
        <ListItem disablePadding>
          <Link href="/terms/privacy" color="black" underline="hover" ml={2} mb={1}>
            <ListItemText primary={'개인정보처리방침'} />
          </Link>
        </ListItem>
        <ListItem disablePadding>
          <Link href="/terms/service" color="black" underline="hover" ml={2}>
            <ListItemText primary={'서비스이용약관'} />
          </Link>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ justifyContent: 'center', display: { xs: 'flex', sm: 'none' } }}>
      <MenuIcon sx={{ color: '#000000' }} onClick={toggleDrawer(true)} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  );
}
