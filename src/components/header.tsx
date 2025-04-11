import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

export const Header = () => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
          {/* 타이틀 */}
          <Link href={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" color="inherit">
              블로그
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
