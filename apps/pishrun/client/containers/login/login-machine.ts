import { createMachine, DoneInvokeEvent, assign } from 'xstate';
import { FailedLoginResponse, User } from '@pishrun/pishrun/types';
import { strapi } from '../../services/strapi';
import { auth } from '../../services/auth';
import { jwtService } from '../../services/jwt';
import {
  LoginContext,
  LoginEvents,
  LoginStates,
  SubmitEvent,
} from './login-types';

const loginMachine = createMachine<
  Partial<LoginContext>,
  LoginEvents,
  LoginStates
>({
  id: 'login',
  initial: 'init',
  states: {
    init: {
      tags: 'disabled',
      on: {
        START: 'dirty',
      },
      meta: {
        description: 'Page already loaded',
      },
    },

    dirty: {
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
      tags: 'disabled',
      on: {
        START: { target: 'dirty' },
      },
      meta: {
        description: 'There is some issue in logging in',
      },
    },
  },
});

async function login(
  ctx: Partial<LoginContext>,
  event: SubmitEvent
): Promise<User> {
  try {
    const { user } = await strapi.login({
      identifier: event.email,
      password: event.password,
    });

    return user as User;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error((error as FailedLoginResponse).message);
  }
}

export default loginMachine;
