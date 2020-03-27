import { GoogleMap, useLoadScript, Data } from '@react-google-maps/api';
import React, { useRef } from 'react';
import { Bounds, VirusModel } from '../../@types/virus';

import Loader from '../Loader';
const options = {
  fullscreenControl: false,
  streetViewControl: false,
  mapTypeControl: false,
};

interface GoogleMapSettings {
  location: google.maps.LatLngLiteral;
  zoom: number;
}

interface Map {
  mapSettings: GoogleMapSettings | undefined;
  data: VirusModel;
  onMapUpdate: (bounds: Bounds, zoom: number) => void;
}

const libraries = ['places'];

const Map = ({ mapSettings, data, onMapUpdate }: Map): JSX.Element => {
  const mapRef = useRef<google.maps.Map | undefined>();
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
      //const map = mapRef.current;
    }
  }, [data]);

  const onUpdate = (): void => {
    if (mapRef.current) {
      const map = mapRef.current;
      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      mapRef.current.data.forEach((feature) => {
        console.log(feature.getProperty('KnKod'));
        const color = '#'+Math.floor(Math.random()*16777215).toString(16);
        mapRef.current.data.overrideStyle(feature, {
          fillColor: color,
        });
      });

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

  const clearAllFeatures = (map: google.maps.Map) =>
    map.data.forEach((feature) => map.data.remove(feature));

  const loadCounty = (map: google.maps.Map) => {
    clearAllFeatures(map);
    map.data.loadGeoJson('./build/assets/geo/sweden-county.json');
  };

  const loadMunicipality = (map: google.maps.Map) => {
    clearAllFeatures(map)
    map.data.loadGeoJson('./build/assets/geo/sweden-municipality.json');
  };

  const onMapLoad = (map: google.maps.Map) => {
    console.log('onMapLoad');
    mapRef.current = map;
    loadCounty(map)

    /*
    mapRef.current.data.forEach((feature) => {
      const color = '#'+Math.floor(Math.random()*16777215).toString(16);
      mapRef.current.data.overrideStyle(feature, {
        fillColor: color,
      });
    });
    */

    map.data.addListener('addfeature', (event) => {
      console.log(event);
    });
    /*
    map.data.setStyle({
      fillColor: 'red',
      fillOpacity: 0.5,
      strokeColor: '#00FF55',
      strokeOpacity: 1,
      strokeWeight: 2,
      zIndex: 2,
    });
    */
  };

  const onDataLoad = (data: google.maps.Data) => {
    console.log('onDataLoad');
    mapRef.current.data.forEach((feature) => {
      const color = '#'+Math.floor(Math.random()*16777215).toString(16);
      mapRef.current.data.overrideStyle(feature, {
        fillColor: color,
      });
    });
  };

  const dataOptions: google.maps.Data.DataOptions = {
    // controls: ['Point'],
    // drawingMode: 'Point',
    fillColor: '#F05',
    fillOpacity: 0.1,
    strokeColor: '#00FF55',
    strokeOpacity: 1,
    strokeWeight: 2,
    zIndex: 2,
  };

  const renderMap = (): JSX.Element => (
    <GoogleMap
      // ref={mapRef}
      options={options}
      center={mapSettings.location}
      zoom={mapSettings.zoom}
      mapContainerStyle={{
        height: '100%',
        width: '100%',
      }}
      onIdle={onUpdate}
      onLoad={onMapLoad}
    >
      <Data onLoad={onDataLoad} options={dataOptions} />
    </GoogleMap>
  );

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <Loader center />;
};

export default Map;
