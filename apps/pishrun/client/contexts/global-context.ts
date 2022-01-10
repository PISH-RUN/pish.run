import React from 'react';
import { InterpreterFrom } from 'xstate';
import { UserMachine } from '../machines/user/user-machine';

interface GlobalContextInterface {
  userService?: InterpreterFrom<typeof UserMachine>;
}

export const GlobalContext = React.createContext<GlobalContextInterface>({});
