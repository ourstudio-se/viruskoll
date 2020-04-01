export const MapColors = [
  '#F1F2D7',
  '#13D380',
  '#0EBA6F',
  '#0AA260',
  '#06874F',
  '#08653C',
  '#064F2F',
  '#064429',
  '#043B23',
  '#042F1C',
  '#022114',
];

export const dataLayerStyle: google.maps.Data.StyleOptions = {
  fillColor: MapColors[0],
  fillOpacity: 0.7,
  strokeColor: '#000000',
  strokeOpacity: 1,
  strokeWeight: 0.5,
};

export const styleMouseOver: google.maps.Data.StyleOptions = {
  strokeColor: '#000000',
  strokeWeight: 3,
};

export const styleMouseOut: google.maps.Data.StyleOptions = {
  strokeColor: '#000000',
  strokeWeight: dataLayerStyle.strokeWeight,
};

export const MapStyle: google.maps.MapTypeStyle[] = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#444444',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        color: '#f2f2f2',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#dbdbdb',
      },
      {
        visibility: 'on',
      },
    ],
  },
];
