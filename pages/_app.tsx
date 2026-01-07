'use client';
import type { AppProps } from 'next/app';

import { HeroUIProvider } from '@heroui/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/router';
import 'styles/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'common/api';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
};

export default App;
