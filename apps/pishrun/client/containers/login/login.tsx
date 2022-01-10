import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMachine } from '@xstate/react';
import loginMachine from './login-machine';
import { GlobalContext } from '../../contexts/global-context';
import LoginForm from '../../forms/login/with-email-password';
import { SuccessfulLoginEvent } from './login-types';
import { useFlow } from '../../hooks/use-flow';

export default function Login(): JSX.Element {
  const flow = useFlow();
  const globalServices = useContext(GlobalContext);

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

  return (
    <div>
      <p>welcome to the login page</p>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
      <LoginForm
        disabled={state.hasTag('disabled')}
        loading={state.matches('loggingIn')}
        onSubmit={(values) => send('SUBMIT', values)}
        error={state.matches('failed') ? state.context.error : null}
        didChange={() => send('START')}
      />
    </div>
  );
}
