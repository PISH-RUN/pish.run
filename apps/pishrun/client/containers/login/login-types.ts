import { JWT, User } from '@pishrun/pishrun/types';
import { DoneInvokeEvent } from 'xstate';

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginContext = {
  jwt: JWT;
  user: User;
  error: string;
};

export type TouchEvent = { type: 'TOUCH' };
export type SubmitEvent = { type: 'SUBMIT'; email: string; password: string };
export type SuccessfulLoginEvent = DoneInvokeEvent<{ user: User }>;

export type LoginEvents = TouchEvent | SubmitEvent | SuccessfulLoginEvent;

export type LoginStates =
  | { value: 'init'; context: undefined }
  | { value: 'touched'; context: undefined }
  | { value: 'loggingIn'; context: undefined }
  | { value: 'loggedIn'; context: Omit<LoginContext, 'error'> }
  | { value: 'failed'; context: Pick<LoginContext, 'error'> };
