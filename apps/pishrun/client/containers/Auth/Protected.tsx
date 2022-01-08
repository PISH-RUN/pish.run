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

  useEffect(() => {
    if (guarded && !loggedIn) {
      router.push('/login');
    }
  }, [router, guarded, loggedIn]);

  if (guarded && !loggedIn) {
    return null;
  }

  return children;
}

export default Protected;
