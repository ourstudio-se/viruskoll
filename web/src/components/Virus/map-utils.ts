export const mapStyle: google.maps.MapTypeStyle[] = [
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "lightness": 0
          },
          {
              "color": "#A0EAD3"
          },
          {
              "saturation": -59
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#161E2E"
          },
          {
              "saturation": 0
          },
          {
              "lightness": 24
          }
      ]
  }
];

export const gradientGreenBlueRed = [
  'rgba(0, 255, 255, 0)',
  'rgba(0, 255, 255, 1)',
  'rgba(0, 191, 255, 1)',
  'rgba(0, 127, 255, 1)',
  'rgba(0, 63, 255, 1)',
  'rgba(0, 0, 255, 1)',
  'rgba(0, 0, 223, 1)',
  'rgba(0, 0, 191, 1)',
  'rgba(0, 0, 159, 1)',
  'rgba(0, 0, 127, 1)',
  'rgba(63, 0, 91, 1)',
  'rgba(127, 0, 63, 1)',
  'rgba(191, 0, 31, 1)',
  'rgba(255, 0, 0, 1)'
];