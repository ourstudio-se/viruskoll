import { Location } from './location';

export interface Organization {
  admin: string;
  name: string;
  locations: Location[];
}

export interface Person {
  email: string;
  organizations: Organization[];
  locations: Location[];
}
