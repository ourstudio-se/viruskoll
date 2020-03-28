import { GoogleMap, useLoadScript, Data } from '@react-google-maps/api';
import React, { useRef } from 'react';
import { Bounds, VirusModel } from '../../@types/virus';

import Loader from '../Loader';
import { GeoObject } from '../../@types/geo';
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

const styleMouseOver: google.maps.Data.StyleOptions = {
  strokeWeight: 4,
};

const styleMouseOut: google.maps.Data.StyleOptions = {
  strokeWeight: dataLayerStyle.strokeWeight,
};

const hideLayers = (
  current: { [key: string | number]: google.maps.Data },
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
  layer: GeoObject;
  onMapUpdate: (bounds: Bounds, zoom: number) => void;
  setDataHover: (obj: object) => void;
}

const libraries = ['places'];

const Map = ({
  mapSettings,
  data,
  layer,
  onMapUpdate,
  setDataHover,
}: Map): JSX.Element => {
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
      data.geolocations.forEach((loc) => {
        const feature = featuresRef.current.find(
          (x) => x.getProperty('LnKod') === loc.id
        );
        if (feature) {
          feature.setProperty('stats', loc);
          layersRef.current[layer.key].overrideStyle(feature, {
            fillColor: feature.getProperty('color'),
          });
        }
      });
      // console.log('DATA RECEIVED');
    }
  }, [data]);

  const updateGeo = React.useCallback(() => {
    const map = mapRef.current;
    if (map && layer) {
      const cachedLayer = layersRef.current[layer.key];
      if (cachedLayer) {
        hideLayers(layersRef.current, layer.key);
        cachedLayer.setMap(map);
      } else {
        const nextLayer = new google.maps.Data();
        nextLayer.setStyle(dataLayerStyle);

        const features = nextLayer.addGeoJson(layer.geo, {
          idPropertyName: layer.key,
        });

        featuresRef.current = features;
        layersRef.current[layer.key] = nextLayer;
        hideLayers(layersRef.current, layer.key);
        nextLayer.setMap(map);
        nextLayer.addListener('mouseover', (event) => {
          // nextLayer.revertStyle();
          // console.log(event.feature.getProperty('stats'));
          setDataHover({
            name: event.feature.getProperty('LnNamn'),
            ...event.feature.getProperty('stats'),
          });
          nextLayer.overrideStyle(event.feature, styleMouseOver);
        });

        nextLayer.addListener('mouseout', (event) => {
          nextLayer.overrideStyle(event.feature, styleMouseOut);
          setDataHover(undefined);
        });
      }
    }
  }, [layer]);

  React.useEffect(() => {
    updateGeo();
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

    updateGeo();
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
