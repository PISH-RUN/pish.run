import React from 'react';
import { InterpreterFrom } from 'xstate';
import { UserMachine } from '../machines/user/user-machine';

interface AppContextInterface {
  userService?: InterpreterFrom<typeof UserMachine>;
}

export const AppContext = React.createContext<AppContextInterface>({});
