import { User } from '@pishrun/pishrun/types';
import { useSelector } from '@xstate/react';
import { useContext } from 'react';
import { GlobalContext } from '../contexts/global-context';

export default function useUser(): User | null {
  const { authService } = useContext(GlobalContext);

  const user = useSelector(authService, (state) =>
    state.matches('loggedIn') ? state.context.user : null
  );

  return user;
}
