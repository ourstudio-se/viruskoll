export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Health {
  symptom: string;
  Count: 2;
}

export interface VirusModel {
  count: number;
  unhealthy: Health[];
  healthy: Health[];
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
