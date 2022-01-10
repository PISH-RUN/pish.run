import { jwt } from '@pishrun/shared/jwt';

export const jwtService = jwt({ prefix: 'PISHRUN' });
