import axios, { Axios } from 'axios';

export interface EmailLoginParams {
  provider: 'email';
  email: string;
  password: string;
}

export async function loginWithEmail<T>(
  api: Axios,
  params: EmailLoginParams
): Promise<T> {
  try {
    const { data } = await api.post<T>('api/auth/local', {
      identifier: params.email,
      password: params.password,
    });

    return data;
  } catch (error) {
    if (!error) {
      throw new Error('Something went wrong');
    }

    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response?.data.error;
    }

    if (typeof error === 'string') {
      throw new Error(error);
    }

    if (typeof error === 'object' && 'toString' in error) {
      throw new Error(error.toString());
    }

    throw new Error('Something went wrong');
  }
}
