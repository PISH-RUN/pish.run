import { createMachine, DoneInvokeEvent, assign } from 'xstate';
import { LoginContext, LoginEvents, LoginStates } from './login-types';
import { login } from './login-actions';

export enum loginTags {
  DISABLED = 'disabled',
}

export const loginMachine = createMachine<
  Partial<LoginContext>,
  LoginEvents,
  LoginStates
>({
  id: 'login',
  initial: 'init',
  states: {
    init: {
      tags: loginTags.DISABLED,
      on: {
        TOUCH: 'touched',
      },
      meta: {
        description: 'Page already loaded',
      },
    },

    touched: {
      on: {
        SUBMIT: { target: 'loggingIn' },
      },
      meta: {
        description: 'User start feed the inputs',
      },
    },

    loggingIn: {
      invoke: {
        id: 'logging-in',
        src: login,
        onDone: {
          target: 'loggedIn',
        },
        onError: {
          target: 'failed',
          actions: assign({
            error: (ctx, event: DoneInvokeEvent<Error>) => event.data.message,
          }),
        },
        meta: {
          description: 'Logging in process started',
        },
      },
    },

    loggedIn: {
      entry: ['loggedIn'],
      meta: {
        description: 'User Logged in to the system successfully',
      },
    },

    failed: {
      tags: loginTags.DISABLED,
      on: {
        START: { target: 'dirty' },
      },
      meta: {
        description: 'There is some issue in logging in',
      },
    },
  },
});
