const DataLayerMouseOver = (
  event: any,
  layer: google.maps.Data,
  setDataHover: (data: object) => void,
  style: google.maps.Data.StyleOptions
) => {
  setDataHover({
    name: event.feature.getProperty('name'),
    ...event.feature.getProperty('stats'),
  });
  layer.overrideStyle(event.feature, style);
};

export default DataLayerMouseOver;
