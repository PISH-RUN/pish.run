import { User } from '@pishrun/pishrun/types';

export type UserContext = {
  user: User;
};

export type LoggedInEvent = {
  type: 'LOGGED_IN';
  user: User;
};

export type LoggedOutEvent = {
  type: 'LOGGED_OUT';
};

export type UserEvent = LoggedInEvent | LoggedOutEvent;

export type UserStates =
  | { value: 'init'; context: undefined }
  | { value: 'guest'; context: undefined }
  | { value: 'loggedIn'; context: UserContext };
