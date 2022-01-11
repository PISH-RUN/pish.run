import { User } from '@pishrun/pishrun/types';
import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { AppContext } from '../contexts/app-context';

export default function useUser(): User | null {
  const { userService } = useContext(AppContext);

  const user = useSelector(userService, (state) =>
    state.matches('loggedIn') ? state.context.user : null
  );

  return user;
}
