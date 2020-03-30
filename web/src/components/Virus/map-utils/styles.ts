export const dataLayerStyle: google.maps.Data.StyleOptions = {
  fillColor: '#a0ead3',
  fillOpacity: 0.5,
  strokeColor: '#161e2e',
  strokeOpacity: 1,
  strokeWeight: 0.5,
};

export const styleMouseOver: google.maps.Data.StyleOptions = {
  strokeWeight: 2,
};

export const styleMouseOut: google.maps.Data.StyleOptions = {
  strokeWeight: dataLayerStyle.strokeWeight,
};
