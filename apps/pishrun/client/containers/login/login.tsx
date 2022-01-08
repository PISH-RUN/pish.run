import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMachine } from '@xstate/react';
import loginMachine, { SuccessfulLoginEvent } from './login-machine';
import { GlobalContext } from '../../contexts/global-context';
import LoginForm from '../../forms/login/with-email-password';

export default function Login(): JSX.Element {
  const router = useRouter();
  const globalServices = useContext(GlobalContext);

  const [state, send] = useMachine(loginMachine, {
    actions: {
      loggedIn: (_, event: SuccessfulLoginEvent) => {
        console.log({ event });
        globalServices.authService.send('LOGIN', event.data);
        router.push('dashboard');
      },
    },
  });

  console.log({ state });

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
