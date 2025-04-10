import createEmotionCache from '@/createEmotionCache';
import { pretendard } from '@/styles/fonts';
import '@/styles/globals.css';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard, sans-serif',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={pretendard.className}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}
