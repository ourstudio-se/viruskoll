export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface VirusModel {}


export interface GeoLocation {
  lat: number;
  lon: number;
}

export interface InitialMapOptions {
  center: google.maps.LatLng | google.maps.LatLngLiteral;
  zoom: number;
}
