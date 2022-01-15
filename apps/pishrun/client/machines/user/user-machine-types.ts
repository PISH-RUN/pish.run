import { EventModel, MemberModel, User } from '@pishrun/pishrun/types';
import { DoneInvokeEvent } from 'xstate';

export type UserContext = {
  user: User;
  event?: EventModel;
  member?: MemberModel;
};

export type BootstrapDone = DoneInvokeEvent<{
  user: User;
  event: EventModel | null;
  member: MemberModel | null;
}>;

export type LoggedInEvent = {
  type: 'LOGGED_IN';
  user: User;
};

export type EnterEvent = {
  type: 'ENTER_EVENT';
};

export type LoggedOutEvent = {
  type: 'LOGGED_OUT';
};

export type UserEvent = LoggedInEvent | EnterEvent | LoggedOutEvent;

export type UserStates =
  | { value: 'init'; context: undefined }
  | { value: 'guest'; context: undefined }
  | { value: 'loggedIn'; context: UserContext }
  | { value: 'performing'; context: UserContext };

export type AllowedUserState = UserStates['value'];
