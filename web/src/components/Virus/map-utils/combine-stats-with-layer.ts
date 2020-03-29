import { GeoObject } from '../../../@types/geo';
import { GeoLocationMetadata } from '../../../@types/virus';

const CombineStatsWithLayer = (
  GeoLocationsMetadata: GeoLocationMetadata[],
  layer: GeoObject,
  layersRef: React.MutableRefObject<{
    [key: string]: google.maps.Data;
  }>
) => {
  GeoLocationsMetadata.forEach((loc) => {
    const feature = layersRef.current[layer.key].getFeatureById(loc.id);
    if (feature) {
      feature.setProperty('stats', loc);
      layersRef.current[layer.key].overrideStyle(feature, {
        fillColor: feature.getProperty('color'),
      });
    }
  });
};

export default CombineStatsWithLayer;
