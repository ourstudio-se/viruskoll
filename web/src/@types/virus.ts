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
type UnhealthyTypes = 'coff' | 'cold' | 'fever';
type DailySituationTypes =
  | 'as-usual'
  | 'home-protecting-others'
  | 'home-protecting-oneself'
  | 'home-caring-others'
  | 'home-exempted'
  | 'home-fired'
  // TODO: Old. Remove below:
  | 'at-work'
  | 'work-from-home'
  | 'home-no-work'
  | 'child-care'
  | 'home-no-work';

export type DataSource = {
  count?: number;
  unhealthy?: BucketContainer<UnhealthyTypes>;
  healthy?: BucketContainer<HealthyTypes>;
  dailySituation?: BucketContainer<DailySituationTypes>;
};

export interface GeoLocationMetadata extends DataSource {
  id: string;
}

export interface VirusModel extends DataSource {
  zoom: number;
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

export interface ModalLayerData extends DataSource {
  name: string;
}
