import { FormProps } from '@pishrun/pishrun/types';
import { isEmail } from '@pishrun/utils';
import { useEffect } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm(props: FormProps<FormValues>) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, errors },
  } = useForm<FormValues>();

  watch();

  const inputs = fields(register);
  const hasError = Object.keys(errors).length > 0 && !!props.error;

  useEffect(() => {
    isDirty && props.didChange();
  }, [props, isDirty]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" name="email" {...inputs.email} />
      <input type="password" name="password" {...inputs.password} />

      <button type="submit" disabled={props.disabled || hasError}>
        login
      </button>
      <p>{props.error}</p>
    </form>
  );

  function onSubmit(values: FormValues) {
    props.onSubmit(values);
    reset({}, { keepValues: true });
  }
}

function fields(register: UseFormRegister<FormValues>) {
  return {
    email: register('email', {
      required: true,
      validate: isEmail,
    }),
    password: register('password', {
      required: true,
    }),
  };
}
