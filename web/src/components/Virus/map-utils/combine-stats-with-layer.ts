import { GeoObject } from '../../../@types/geo';
import { GeoLocationMetadata } from '../../../@types/virus';
import { MapColors } from './styles';

const _getColorForPercentage = (percentage) => {
  const index = Math.round(percentage / 10);
  return index > 9 ? MapColors[10] : MapColors[index];
};

const CombineStatsWithLayer = (
  GeoLocationsMetadata: GeoLocationMetadata[],
  layer: GeoObject,
  layersRef: React.MutableRefObject<{
    [key: string]: google.maps.Data;
  }>
) => {
  GeoLocationsMetadata.forEach((loc) => {
    const feature = layersRef.current[layer.zoom].getFeatureById(loc.id);
    if (feature) {
      feature.setProperty('stats', loc);

      const percentage =
        (loc.unhealthy.count / (loc.unhealthy.count + loc.healthy.count)) * 100;
      const color = _getColorForPercentage(percentage);
      layersRef.current[layer.zoom].overrideStyle(feature, {
        fillColor: color,
      });
    }
  });
};

export default CombineStatsWithLayer;
