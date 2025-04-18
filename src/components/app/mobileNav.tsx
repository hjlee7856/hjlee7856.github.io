import { UserProfile } from '@/components/app/userProfile';
import { categories } from '@/constants/categorys';
import { useCategory } from '@/hooks/useCategory';
import useUserStore from '@/store/userStore';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

export default function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { changeCategory } = useCategory();
  const { user } = useUserStore();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography ml={1} variant="subtitle1" fontWeight="bold">
        회원정보
      </Typography>
      {/* 프로필 */}
      <Box display={'flex'} flex={1} gap={1} alignItems={'center'} py={1} ml={2}>
        <UserProfile handleDrawer={toggleDrawer(false)} />
        {user?.name && <Typography>{user?.name}님 안녕하세요.</Typography>}
      </Box>
      <Divider />
      {/* 카테고리 */}
      <List onClick={toggleDrawer(false)}>
        <Typography ml={1} variant="subtitle1" fontWeight="bold">
          카테고리
        </Typography>
        {categories.map((category, idx) => (
          <ListItem key={idx} disablePadding>
            <ListItemButton onClick={(e) => changeCategory(e, idx)}>
              <ListItemText primary={category.categoryName} />
            </ListItemButton>
          </ListItem>
        ))}
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
