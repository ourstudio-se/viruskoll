

export interface GeoLocation {
  lat: number;
  lon: number;
}

export interface Location {
  city: string;
  country: string;
  geolocation: GeoLocation;
  name: string;
  street: string;
  zip: string;
}

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
