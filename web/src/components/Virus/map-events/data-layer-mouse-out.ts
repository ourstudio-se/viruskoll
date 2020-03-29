const DataLayerMouseOut = (
  event: any,
  layer: google.maps.Data,
  setDataHover: (data: object) => void,
  style: google.maps.Data.StyleOptions
) => {
  layer.overrideStyle(event.feature, style);
  setDataHover(undefined);
};

export default DataLayerMouseOut;
