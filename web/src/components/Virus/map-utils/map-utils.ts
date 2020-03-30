import { GeoLocation } from '../../../@types/location';
import { Bounds } from '../../../@types/virus';

export const LatLngToGeoLocation = (
  latLng: google.maps.LatLng
): GeoLocation => ({
  lat: latLng.lat(),
  lon: latLng.lng(),
});

export const LatLngBoundsToBounds = (
  bounds: google.maps.LatLngBounds
): Bounds => ({
  sw: LatLngToGeoLocation(bounds.getSouthWest()),
  ne: LatLngToGeoLocation(bounds.getNorthEast()),
});

export const hideLayers = (
  current: { [key: number]: google.maps.Data },
  layer: string | number
) => {
  Object.keys(current).forEach((_layer) => {
    if (_layer !== layer && current[_layer].getMap()) {
      current[_layer].setMap(null);
    }
  });
};
