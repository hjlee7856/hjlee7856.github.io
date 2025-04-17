import { AppHeader } from '@/components/app/appHeader';
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
  useAuthListener();

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" className={pretendard.className} sx={{ padding: 0 }}>
          <AppHeader />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}
