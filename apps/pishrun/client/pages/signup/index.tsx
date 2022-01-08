import axios from 'axios';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { username, email, password } = data;
    signup(username, email, password);
  };

  const signup = async (username, email, password) => {
    try {
      const { data } = await axios.post(
        'http://localhost:1337/api/auth/local/register',
        {
          username,
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>welcome to the signup page</p>
      <Link href="/login">
        <a>login</a>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input type="text" name="username" {...register('username')} />
        <input type="email" name="email" {...register('email')} />
        <input type="password" name="password" {...register('password')} />

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
