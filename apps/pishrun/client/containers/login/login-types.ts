import { JWT, User } from '@pishrun/pishrun/types';
import { DoneInvokeEvent } from 'xstate';

export type LoginContext = {
  jwt: JWT;
  user: User;
  error: string;
};

export type StartEvent = { type: 'START' };
export type SubmitEvent = { type: 'SUBMIT'; email: string; password: string };
export type SuccessfulLoginEvent = DoneInvokeEvent<{ user: User }>;

export type LoginEvents = StartEvent | SubmitEvent | SuccessfulLoginEvent;

export type LoginStates =
  | { value: 'init'; context: undefined }
  | { value: 'dirty'; context: undefined }
  | { value: 'loggingIn'; context: undefined }
  | { value: 'loggedIn'; context: Omit<LoginContext, 'error'> }
  | { value: 'failed'; context: Pick<LoginContext, 'error'> };
