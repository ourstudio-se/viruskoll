import { GeoLocation } from "./location";

export type Symptoms = 'fever' | 'coff' | 'cold' | 'healthy' | 'at-work' | 'work-from-home' | 'home-no-work' | 'child-care';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Health {
  symptom: Symptoms;
  count: number;
}

interface HealthModel {
  count: number;
  buckets: Health[]
}

export interface GeoLocationMetadata {
  geolocation: GeoLocation;
  doc_count: number;
  healthy: HealthModel,
  unhealthy: HealthModel,
  workSituations: HealthModel,
};

export interface VirusModel {
  count: number;
  unhealthy: Health[];
  healthy: Health[];
  workingSituation: Health[];
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
