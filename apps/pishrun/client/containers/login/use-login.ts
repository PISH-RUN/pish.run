import { useMachine } from '@xstate/react';
import { useContext, useCallback } from 'react';
import { AppContext } from '../../contexts/app-context';
import { useFlow } from '../../hooks/use-flow';
import { loginMachine, loginTags } from './login-machine';
import { LoginFormValues, SuccessfulLoginEvent } from './login-types';

export function useLogin() {
  const flow = useFlow();
  const globalServices = useContext(AppContext);

  const [state, send] = useMachine(loginMachine, {
    actions: {
      loggedIn: (_, event: SuccessfulLoginEvent) => {
        const { user } = event.data;
        globalServices.userService.send('LOGGED_IN', {
          user,
        });

        flow.loggedIn();
      },
    },
  });

  const login = (values: LoginFormValues) => send('SUBMIT', values);

  const touch = () => send('TOUCH');

  return {
    disabled: state.hasTag(loginTags.DISABLED),
    loading: state.matches('loggingIn'),
    error: state.matches('failed') ? state.context.error : null,
    login,
    touch,
  };
}
