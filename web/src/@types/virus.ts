import { GeoLocation } from './location';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Health {
  symptom: string;
  count: number;
}

export interface GeoLocationMetadata {
  geolocation: GeoLocation;
  doc_count: number;
}

export interface VirusModel {
  count: number;
  unhealthy: Health[];
  healthy: Health[];
  workingSituations: Health[];
  geolocations: GeoLocationMetadata[];
}

export interface GoogleMapSettings {
  location: google.maps.LatLngLiteral;
  zoom: number;
}

export interface Bounds {
  sw: GeoLocation;
  ne: GeoLocation;
}

export interface VirusPayload {
  precision: number;
  sw: GeoLocation;
  ne: GeoLocation;
}
