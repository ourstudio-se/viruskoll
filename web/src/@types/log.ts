import { GeoLocation } from './location';

export type ValidSymptoms =
  | 'fever'
  | 'coff'
  | 'cold'
  | 'sneezing'
  | 'sore-throat'
  | 'muscle-aches'
  | 'other'
  | 'healthy';

export type ValidDailySituations =
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

export interface LogLocation {
  geolocation: GeoLocation;
}

export interface LogSymptom {
  symptoms: ValidSymptoms[];
  dailySituation?: ValidDailySituations;
}
