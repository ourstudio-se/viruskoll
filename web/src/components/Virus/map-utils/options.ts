import { MapStyle } from './styles';

export const MapOptions: google.maps.MapOptions = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  styles: MapStyle,
};
