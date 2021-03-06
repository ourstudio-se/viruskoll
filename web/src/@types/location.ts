export interface GeoLocation {
  lat: number;
  lon: number;
}

export interface Location {
  city: string;
  country: string;
  region: string;
  geolocation: GeoLocation;
  name: string;
  street: string;
  zip: string;
}
