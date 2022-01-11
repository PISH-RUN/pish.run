import { FormProps } from '@pishrun/pishrun/types';
import { isEmail } from '@pishrun/utils';
import { useEffect } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function SignupForm(props: FormProps<FormValues>) {
  return (
    <form>
      <input type="text" name="username" />
      <input type="email" name="email" />
      <input type="password" name="password" />

      <button type="submit">signup</button>
    </form>
  );
}
