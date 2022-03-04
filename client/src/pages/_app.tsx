import type { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from '@/theme';
import { AdminLayout } from '@/components/Layouts/Admin/Admin';
import ErrorToast from '@/components/UI/Toasts/ErrorToast';

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'roboto',serif;
  }
`;

type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const CustomApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <AdminLayout>{page}</AdminLayout>);

  const content = getLayout(<Component {...pageProps} />);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {content}
        <ErrorToast />
      </ThemeProvider>
    </>
  );
};

export default CustomApp;
