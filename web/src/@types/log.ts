import { GeoLocation } from "./location";


export type ValidSymptoms = 'fever' | 'coff' | 'cold' | 'healthy';
export type ValidWorkSituations = 'at-work' | 'work-from-home' | 'home-no-work' | 'child-care'

export interface LogLocation {
  geolocation: GeoLocation;
}

export interface LogSymptom {
  symptoms: ValidSymptoms[];
  workSituation: ValidWorkSituations;
  location: LogLocation;
}