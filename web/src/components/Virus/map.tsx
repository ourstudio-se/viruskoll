import { GoogleMap, useLoadScript, Data } from '@react-google-maps/api';
import React, { useRef } from 'react';
import { Bounds, VirusModel } from '../../@types/virus';

import Loader from '../Loader';
const options = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
};

const dataLayerStyle: google.maps.Data.StyleOptions = {
  fillColor: '#a0ead3',
  fillOpacity: 0.5,
  strokeColor: '#161e2e',
  strokeOpacity: 1,
  strokeWeight: 0.5,
};
const hideLayers = (
  current: { [key: string]: google.maps.Data },
  layer: string
) => {
  Object.keys(current).forEach((_layer) => {
    if (_layer !== layer && current[_layer].getMap()) {
      current[_layer].setMap(null);
    }
  });
};

interface GoogleMapSettings {
  location: google.maps.LatLngLiteral;
  zoom: number;
}

interface Map {
  mapSettings: GoogleMapSettings | undefined;
  data: VirusModel;
  layer: string;
  onMapUpdate: (bounds: Bounds, zoom: number) => void;
}

const libraries = ['places'];

const Map = ({ mapSettings, data, layer, onMapUpdate }: Map): JSX.Element => {
  const mapRef = useRef<google.maps.Map | undefined>();
  const layersRef = useRef<{ [key: string]: google.maps.Data }>({});
  const featuresRef = useRef<google.maps.Data.Feature[]>();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCtL-H9uXwcarr1xoSRKi_3i3V07tG2TV8',
    libraries,
  });

  React.useEffect(() => {
    if (mapSettings && mapRef.current) {
      mapRef.current.panTo(mapSettings.location);
      mapRef.current.setZoom(mapSettings.zoom);
    }
  }, [mapSettings]);

  React.useEffect(() => {
    if (data && data.geolocations && mapRef.current) {
      // console.log('DATA RECEIVED');
    }
  }, [data]);

  React.useEffect(() => {
    const map = mapRef.current;
    if (map) {
      const cachedLayer = layersRef.current[layer];
      if (cachedLayer) {
        hideLayers(layersRef.current, layer);
        cachedLayer.setMap(map);
      } else {
        const nextLayer = new google.maps.Data();
        nextLayer.setStyle(dataLayerStyle);
        nextLayer.loadGeoJson(layer, { idPropertyName: layer }, (features) => {
          featuresRef.current = features;
          layersRef.current[layer] = nextLayer;
          setTimeout(() => {
            // Prevents flickering
            hideLayers(layersRef.current, layer);
            nextLayer.setMap(map);
          }, 1);
        });
      }
    }
  }, [layer]);

  const onUpdate = (): void => {
    if (mapRef.current) {
      const map = mapRef.current;
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      const bound: Bounds = {
        sw: {
          lat: sw.lat(),
          lon: sw.lng(),
        },
        ne: {
          lat: ne.lat(),
          lon: ne.lng(),
        },
      };
      const zoom = map.getZoom();
      onMapUpdate(bound, zoom);
    }
  };

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const renderMap = (): JSX.Element => (
    <GoogleMap
      options={options}
      center={mapSettings.location}
      zoom={mapSettings.zoom}
      mapContainerStyle={{
        height: '100%',
        width: '100%',
      }}
      onIdle={onUpdate}
      onLoad={onMapLoad}
    />
  );

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <Loader center />;
};

export default Map;

/*
features.forEach((feature) => {
  
  const color = `#${Math.floor(Math.random() * 16777215).toString(
    16
  )}`;

  newLayer.overrideStyle(feature, {
    fillColor: color,
  });
});
*/

/*
mapRef.current.data.forEach((feature) => {
  const color = `#${Math.floor(Math.random() * 16777215).toString(
    16
  )}`;
  mapRef.current.data.overrideStyle(feature, {
    fillColor: color,
  });
});
*/
