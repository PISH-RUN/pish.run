import { AllowedUserState } from '../machines/user/user-machine-types';

export interface StaticProps {
  allowed?: AllowedUserState | Array<AllowedUserState>;
  fallback?: string;
}
