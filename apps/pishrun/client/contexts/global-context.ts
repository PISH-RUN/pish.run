import React from 'react';
import { InterpreterFrom } from 'xstate';
import { authMachine } from '../machines/auth-machine';

interface GlobalContextInterface {
  authService?: InterpreterFrom<typeof authMachine>;
}

export const GlobalContext = React.createContext<GlobalContextInterface>({});
