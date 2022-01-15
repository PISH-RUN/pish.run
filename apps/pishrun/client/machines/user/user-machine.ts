import { User } from '@pishrun/pishrun/types';
import { createMachine, assign } from 'xstate';
import { getMember, getPerformingEvent, strapi } from '../../services/strapi';
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
        onDone: [
          {
            target: 'loggedIn',
            cond: (ctx, event: BootstrapDone) => event.data.event,
            actions: assign((_, event: BootstrapDone) => ({
              user: event.data.user,
            })),
          },
        ],

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
        ENTER_EVENT: 'performing',
        LOGGED_OUT: 'guest',
      },
    },
    performing: {},
  },
});

async function bootstrap() {
  const [user, event] = await Promise.all([
    strapi.fetchUser() as Promise<User>,
    getPerformingEvent(),
  ]);

  if (!user) {
    throw new Error('Unauthenticated');
  }

  if (!event) {
    return { user, event: null, member: null };
  }

  const member = await getMember(user.id, event.id);

  return { user, event, member };
}
