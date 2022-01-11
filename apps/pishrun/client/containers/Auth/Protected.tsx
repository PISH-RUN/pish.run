import { useActor } from '@xstate/react';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/app-context';
import { AllowedUserState } from '../../machines/user/user-machine-types';

export type ProtectedProps = {
  children: React.ReactNode;
  allowed?: AllowedUserState | Array<AllowedUserState>;
  fallback?: string;
};

function Protected(props) {
  const { userService } = useContext(AppContext);
  const [state] = useActor(userService);
  const router = useRouter();

  const allowedStates = Array.isArray(props.allowed)
    ? props.allowed
    : [props.allowed];
  const allowed = allowedStates.some(state.matches);
  const loading = state.matches('init');

  console.log({ state });

  useEffect(() => {
    if (loading || allowed) {
      return;
    }

    if (props.fallback) {
      router.push(props.fallback);
      return;
    }

    router.back();
  }, [router, loading, allowed, props.fallback]);

  if (state.matches('init')) {
    return <div>Loading...</div>;
  }

  if (!allowed) {
    return null;
  }

  return props.children;
}

export default Protected;
