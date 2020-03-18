export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface VirusModel {
  count: number;
  noSymptoms: number;
  withSymptoms: number;
  symptoms: []
}


export interface GeoLocationModel {
  lat: number;
  lon: number;
}

export interface InitialMapOptions {
  center: google.maps.LatLng | google.maps.LatLngLiteral;
  zoom: number;
}

export interface Bounds {
  sw: GeoLocationModel;
  ne: GeoLocationModel;
}
