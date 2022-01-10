import { useRouter } from 'next/router';

export function useFlow() {
  const router = useRouter();

  function loggedIn() {
    router.push('/dashboard');
  }

  function guest() {
    router.push('/login');
  }

  return {
    loggedIn,
    guest,
  };
}
