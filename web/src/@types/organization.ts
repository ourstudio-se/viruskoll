import { Location } from "./location";

export interface Organization {
  admin: string;
  name: string;
  locations: Location[];
}

export interface Person {
  birthYear: number;
  email: string;
  emailVerified: boolean;
  organizations: Organization[];
  locations: Location[];
}
