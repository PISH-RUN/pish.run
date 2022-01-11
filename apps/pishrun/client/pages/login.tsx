import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useLogin } from '../containers/login/use-login';
import LoginForm from '../forms/login/with-email';
import { StaticProps } from '../types';

type LoginPageProps = StaticProps;

export default function Login(props: LoginPageProps): JSX.Element {
  const { disabled, loading, error, login, touch } = useLogin();

  return (
    <div>
      <p>welcome to the login page</p>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
      <LoginForm
        disabled={disabled}
        loading={loading}
        error={error}
        onSubmit={login}
        didChange={touch}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps<LoginPageProps> = async (
  context
) => {
  return {
    props: {
      allowed: ['guest'],
      fallback: 'dashboard',
    },
  };
};
