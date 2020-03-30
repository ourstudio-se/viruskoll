const DataLayerMouseOver = (
  event: any,
  layer: google.maps.Data,
  style: google.maps.Data.StyleOptions,
  selectedFeature: React.MutableRefObject<google.maps.Data.Feature>
) => {
  if (
    !selectedFeature.current ||
    selectedFeature.current.getId() !== event.feature.getId()
  ) {
    layer.overrideStyle(event.feature, style);
  }
};

export default DataLayerMouseOver;
