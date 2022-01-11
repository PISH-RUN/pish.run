import useUser from '../../hooks/use-user';

export default function Dashboard() {
  const user = useUser();

  console.log({ cmp: 'dashboard', user });
  return <div>Welcome</div>;
}

export async function getStaticProps(context) {
  return {
    props: {
      allowed: ['loggedIn'],
      fallback: 'login',
    },
  };
}
