import { GeoObject } from '../../../@types/geo';
import { GeoLocationMetadata } from '../../../@types/virus';
import { MapColors } from './styles';

const _getColorForPercentage = (percentage) => {
  const index = Math.round(percentage / 10);
  if (index > 9) {
    return MapColors[10];
  }

  if (index < 0) {
    return MapColors[0];
  }

  return MapColors[index];
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
      const { count, unhealthy } = loc;
      const unhealthyCount = unhealthy?.count || 0;
      const percentage = count < 4 ? 0 : (unhealthyCount / count) * 100 || 0;

      const color = _getColorForPercentage(percentage);
      layersRef.current[layer.zoom].overrideStyle(feature, {
        fillColor: color,
      });
    }
  });
};

export default CombineStatsWithLayer;
