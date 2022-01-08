import { useInterpret, useSelector } from '@xstate/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Protected from '../containers/Auth/Protected';
import { GlobalContext } from '../contexts/global-context';
import { authMachine } from '../machines/auth-machine';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const authService = useInterpret(authMachine);

  return (
    <GlobalContext.Provider value={{ authService }}>
      <Head>
        <title>Welcome to pishrun-front!</title>
      </Head>
      <Protected guarded={pageProps.guarded}>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </Protected>
    </GlobalContext.Provider>
  );
}

export default CustomApp;
