import { Timestamp } from '@pishrun/types';
import { Axios, AxiosResponse } from 'axios';
import parseISO from 'date-fns/parseISO';

export type NormalizedTimestamp = {
  createdAt?: Date;
  updatedAt?: Date;
};

export function axiosTimestamp(axios: Axios) {
  axios.interceptors.response.use(shapeResponse);
}

function shapeResponse(
  response: AxiosResponse<Timestamp>
): AxiosResponse<NormalizedTimestamp> {
  const { data } = response;
  const { createdAt, updatedAt, ...rest } = data;

  const normalized: NormalizedTimestamp = {};

  if (typeof createdAt === 'string') {
    const createdAtDate = parseISO(createdAt);
    if (createdAtDate) {
      normalized['createdAt'] = createdAtDate;
    }
  }

  if (typeof updatedAt === 'string') {
    const updatedAtDate = parseISO(updatedAt);
    if (updatedAtDate) {
      normalized['updatedAt'] = updatedAtDate;
    }
  }

  return {
    ...response,
    data: {
      ...rest,
      ...normalized,
    },
  };
}
