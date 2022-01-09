import { User } from '@pishrun/pishrun/types';
import { createMachine } from 'xstate';
import { assign } from 'xstate';

type AuthContext = {
  user: User;
};

type LoginEvent = {
  type: 'LOGIN';
  user: User;
};

type LogoutEvent = {
  type: 'LOGOUT';
};

export type AuthEvent = LoginEvent | LogoutEvent;

type AuthStates =
  | { value: 'init'; context: undefined }
  | { value: 'guest'; context: undefined }
  | { value: 'loggedIn'; context: AuthContext };

export const authMachine = createMachine<
  Partial<AuthContext>,
  AuthEvent,
  AuthStates
>({
  id: 'authMachine',
  initial: 'init',
  context: undefined,
  states: {
    init: {
      invoke: {
        id: 'bootstrap',
        src: bootstrap,
        onDone: {
          target: 'loggedIn',
        },
        onError: {
          target: 'guest',
        },
      },
    },
    guest: {
      on: {
        LOGIN: {
          target: 'loggedIn',
          actions: assign((_, event: LoginEvent) => {
            return {
              user: event.user,
            };
          }),
        },
      },
    },
    loggedIn: {
      on: {
        LOGOUT: 'guest',
      },
    },
  },
});

async function bootstrap() {
  const res = await new Promise((res) => setTimeout(res, 10000));
  return res;
}
