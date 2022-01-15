export enum MemberRole {
  TEAMMATE = 'teammate',
  MANAGER = 'manager',
}

export interface Model {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventModel extends Model {
  slug: string;
  title: string;
  description?: string;
  startAt: Date;
  endAt: Date;
  isPerforming: boolean;
}

export interface MemberModel extends Model {
  role: MemberRole;
  enteredAt: Date;
  exitedAt: Date;
  team: TeamModel;
  seat: SeatModel;
}

export interface TeamModel extends Model {
  name: string;
  description: string;
}

export interface SeatModel extends Model {
  slug: string;
  hall: HallModel;
}

export interface HallModel extends Model {
  name: string;
  description: string;
}

export type ResponseModel<
  T extends Model,
  U extends Record<string, unknown> | undefined = undefined
> = {
  id: number;
  attributes: U extends undefined
    ? Omit<T, 'id'>
    : Omit<T, 'id'> & {
        [K in keyof U]: {
          data: {
            id: number;
            attributes: Omit<U[K], 'id'>;
          };
        };
      };
};
