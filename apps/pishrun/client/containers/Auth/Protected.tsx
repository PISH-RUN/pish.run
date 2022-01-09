import { useActor } from '@xstate/react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../contexts/global-context';

export type ProtectedProps = {
  children: React.ReactNode;
  guarded?: boolean;
};

function Protected({ children, guarded = false }) {
  const { authService } = useContext(GlobalContext);
  const [state] = useActor(authService);
  const router = useRouter();

  const loggedIn = state.matches('loggedIn');
  const loading = state.matches('init');

  console.log({ state });

  useEffect(() => {
    if (loading) {
      return;
    }
    if (guarded && !loggedIn) {
      router.push('/login');
    }
  }, [router, loading, guarded, loggedIn]);

  if (state.matches('init')) {
    return <div>Please Wait we're doing something great</div>;
  }

  if (guarded && !loggedIn) {
    return null;
  }

  return children;
}

export default Protected;
