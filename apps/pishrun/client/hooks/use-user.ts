import { User } from '@pishrun/pishrun/types';
import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/global-context';

export default function useUser(): User | null {
  const { userService } = useContext(GlobalContext);

  const user = useSelector(userService, (state) =>
    state.matches('loggedIn') ? state.context.user : null
  );

  return user;
}
