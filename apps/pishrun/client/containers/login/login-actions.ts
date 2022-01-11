import { FailedLoginResponse, User } from '@pishrun/pishrun/types';
import { strapi } from '../../services/strapi';
import { LoginContext, SubmitEvent } from './login-types';

export async function login(
  ctx: Partial<LoginContext>,
  event: SubmitEvent
): Promise<User> {
  try {
    const { user } = await strapi.login({
      identifier: event.email,
      password: event.password,
    });

    return user as User;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error((error as FailedLoginResponse).message);
  }
}
