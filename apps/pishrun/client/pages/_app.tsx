import { useInterpret, useSelector } from '@xstate/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Protected from '../containers/Auth/Protected';
import { AppContext } from '../contexts/app-context';
import { UserMachine } from '../machines/user/user-machine';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const userService = useInterpret(UserMachine);

  return (
    <AppContext.Provider value={{ userService }}>
      <Head>
        <title>Welcome to pishrun-front!</title>
      </Head>
      <Protected allowed={pageProps.allowed} fallback={pageProps.fallback}>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </Protected>
    </AppContext.Provider>
  );
}

export default CustomApp;
