import { useInterpret, useSelector } from '@xstate/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Protected from '../containers/Auth/Protected';
import { GlobalContext } from '../contexts/global-context';
import { UserMachine } from '../machines/user/user-machine';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const userService = useInterpret(UserMachine);

  return (
    <GlobalContext.Provider value={{ userService }}>
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
