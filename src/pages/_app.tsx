import AppFooter from '@/components/app/appFooter';
import { AppHeader } from '@/components/app/appHeader/appHeader';
import LoginModal from '@/components/login/loginModal';
import createEmotionCache from '@/createEmotionCache';
import { useAuthListener } from '@/hooks/useAuthListener';
import { pretendard } from '@/styles/fonts';
import '@/styles/globals.css';
import theme from '@/theme';
import { CacheProvider } from '@emotion/react';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

const clientSideEmotionCache = createEmotionCache();

export default function App({ Component, pageProps }: AppProps) {
  // 로그인 체크
  useAuthListener();

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          className={pretendard.className}
          maxWidth={false}
          sx={{ padding: '0 !important' }}
        >
          <AppHeader />
          <Container
            maxWidth="lg"
            sx={{
              position: 'relative',
              minHeight: '70vh',
              mt: { xs: 7, sm: 8 },
              p: 1,
              pt: 0,
            }}
          >
            <Component {...pageProps} />
            <LoginModal />
          </Container>
          <AppFooter />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}
