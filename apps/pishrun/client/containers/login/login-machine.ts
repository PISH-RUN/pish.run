import { createMachine, DoneInvokeEvent, assign } from 'xstate';
import {
  FailedLoginResponse,
  JWT,
  SuccessLoginResponse,
  User,
} from '@pishrun/pishrun/types';
import { auth } from '../../services/auth';
import jwt from '../../services/jwt';

type LoginContext = {
  jwt: JWT;
  user: User;
  error: string;
};

export type StartEvent = { type: 'START' };
export type SubmitEvent = { type: 'SUBMIT'; email: string; password: string };
export type SuccessfulLoginEvent = DoneInvokeEvent<{ user: User }>;

type LoginEvents = StartEvent | SubmitEvent | SuccessfulLoginEvent;

type LoginStates =
  | { value: 'init'; context: undefined }
  | { value: 'dirty'; context: undefined }
  | { value: 'loggingIn'; context: undefined }
  | { value: 'loggedIn'; context: Omit<LoginContext, 'error'> }
  | { value: 'failed'; context: Pick<LoginContext, 'error'> };

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
    const data = await auth.login<SuccessLoginResponse>({
      provider: 'email',
      email: event.email,
      password: event.password,
    });

    jwt.set(data.jwt);
    return data.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error((error as FailedLoginResponse).message);
  }
}

export default loginMachine;
