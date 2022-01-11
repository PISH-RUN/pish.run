import { User } from '@pishrun/pishrun/types';
import { createMachine, assign } from 'xstate';
import { strapi } from '../../services/strapi';
import {
  LoggedInEvent,
  BootstrapDone,
  UserContext,
  UserEvent,
  UserStates,
} from './user-machine-types';

export const UserMachine = createMachine<
  Partial<UserContext>,
  UserEvent,
  UserStates
>({
  id: 'user-machine',
  initial: 'init',
  context: undefined,
  states: {
    init: {
      invoke: {
        id: 'user-bootstrap',
        src: bootstrap,
        onDone: {
          target: 'loggedIn',
          actions: assign((_, event: BootstrapDone) => ({
            user: event.data.user,
          })),
        },
        onError: {
          target: 'guest',
        },
      },
    },
    guest: {
      on: {
        LOGGED_IN: {
          target: 'loggedIn',
          actions: assign((_, event: LoggedInEvent) => {
            return {
              user: event.user,
            };
          }),
        },
      },
    },
    loggedIn: {
      on: {
        LOGGED_OUT: 'guest',
      },
    },
  },
});

async function bootstrap() {
  const user = await strapi.fetchUser();

  if (!user) {
    throw new Error('Unauthenticated');
  }

  return { user: user as User };
}
