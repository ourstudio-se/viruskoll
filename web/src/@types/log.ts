import { GeoLocation } from './location';

export type ValidWorkSituations =
  | 'at-work'
  | 'work-from-home'
  | 'home-no-work'
  | 'child-care';

export type ValidSymptoms =
  'fever' |
  'coff' |
  'cold' |
  'sneezing' |
  'sore-throat' |
  'muscle-aches' |
  'healthy';

export interface LogLocation {
  geolocation: GeoLocation;
}

export interface LogSymptom {
  symptoms: ValidSymptoms[];
  workSituation: ValidWorkSituations;
}
