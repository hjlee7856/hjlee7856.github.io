// components/common/Footer.tsx
import LaunchIcon from '@mui/icons-material/Launch';
import { Box, Container, IconButton, Link, Stack, Typography } from '@mui/material';

const AppFooter = () => {
  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 4, mt: 8 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Hyungjun Lee. All rights reserved.
          </Typography>

          <Stack
            display={'flex'}
            sx={{ flexDirection: 'row' }}
            gap={2}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Link href="/terms/privacy" color="text.secondary" underline="hover">
              <Typography variant="body2" color="text.secondary">
                개인정보처리방침
              </Typography>
            </Link>
            <Link href="/terms/service" color="text.secondary" underline="hover">
              <Typography variant="body2" color="text.secondary">
                서비스이용약관
              </Typography>
            </Link>
            <Link
              href="https://github.com/hjlee7856/hjlee7856.github.io"
              target="_blank"
              color="text.secondary"
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <Typography variant="body2" color="text.secondary">
                Github
              </Typography>
              <IconButton sx={{ pl: '4px' }}>
                <LaunchIcon sx={{ color: 'rgba(0, 0, 0, 0.6)' }} fontSize="small" />
              </IconButton>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default AppFooter;
