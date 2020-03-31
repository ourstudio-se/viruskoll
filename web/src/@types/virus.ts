import { GeoLocation } from './location';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Health {
  symptom: string;
  count: number;
}

export interface Bucket<T> {
  symptom: T;
  count: number;
}

export interface BucketContainer<T> {
  count: number;
  buckets: Bucket<T>[];
}

type HealthyTypes = 'healthy';
type UnhealthyTypes = 'coff' | 'cold' | 'fevet';
type WorkingSituationTypes =
  | 'at-work'
  | 'home-no-work'
  | 'work-from-home'
  | 'child-care';

export interface GeoLocationMetadata {
  id: string;
  count: number;
  unhealthy: BucketContainer<UnhealthyTypes>;
  healthy: BucketContainer<HealthyTypes>;
  workingSituation: BucketContainer<WorkingSituationTypes>;
}

export interface VirusModel {
  zoom: number;
  count: number;
  geolocations: GeoLocationMetadata[];
  unhealthy: BucketContainer<UnhealthyTypes>;
  healthy: BucketContainer<HealthyTypes>;
  workingSituation: BucketContainer<WorkingSituationTypes>;
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

export type ModalLayerData = GeoLocationMetadata & {
  name: string;
};
