import {
  EventModel,
  HallModel,
  MemberModel,
  Model,
  ModelContent,
  ResponseModel,
  SeatModel,
  TeamModel,
} from '@pishrun/pishrun/types';
import Strapi from 'strapi-sdk-js';

export const strapi = new Strapi({
  url: process.env.NEXT_PUBLIC_STRAPI_URL,
  store: {
    key: 'access_token',
    useLocalStorage: true,
  },
});

type EventResponse = ResponseModel<EventModel>;
export const getPerformingEvent = async (): Promise<EventModel> => {
  const { data } = await strapi.find<EventResponse[]>('events', {
    filters: {
      is_performing: {
        $eq: true,
      },
    },
  });

  if (data.length === 0) {
    return null;
  }

  return flat(data[0]);
};

type GetMemberResponse = ResponseModel<
  MemberModel,
  {
    team: TeamModel;
    seat: ResponseModel<SeatModel, { hall: HallModel }>['attributes'];
  }
>;
export const getMember = async (userId, eventId): Promise<MemberModel> => {
  const { data } = await strapi.find<GetMemberResponse[]>('members', {
    filters: {
      users_permissions_user: {
        id: {
          $eq: userId,
        },
      },
      team: {
        event: {
          id: {
            $eq: eventId,
          },
        },
      },
    },
    populate: ['team', 'seat', 'seat.hall'],
  });

  if (data.length === 0) {
    return null;
  }

  return flat(data[0]);
};

function flat(response) {
  if (typeof response !== 'object') {
    return response;
  }

  const { attributes, id } = response;
  const result = { id };

  if (!attributes) {
    return result;
  }

  for (const key in attributes) {
    const value = attributes[key];
    if (value && typeof value === 'object' && 'data' in value) {
      result[key] = flat(value.data);
    } else {
      result[key] = value;
    }
  }

  return result;
}
