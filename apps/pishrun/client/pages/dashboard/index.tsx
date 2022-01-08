import useUser from '../../hooks/use-user';

export default function Dashboard() {
  const user = useUser();

  console.log(user);
  return <div>Welcome {user.username}</div>;
}

export async function getStaticProps(context) {
  return {
    props: {
      guarded: true,
    },
  };
}
