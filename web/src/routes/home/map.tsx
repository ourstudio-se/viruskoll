import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React, { useRef } from 'react';
import { InitialMapOptions, Bounds } from './models';

const options = {
  fullscreenControl: false,
  streetViewControl: false,
};

interface Map {
  initialOptions: InitialMapOptions;
  onMapUpdate: (bounds: Bounds, zoom: number) => void;
}

const Map = ({
  initialOptions,
  onMapUpdate,
}: Map): JSX.Element => {
  const mapRef = useRef<GoogleMap>();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCtL-H9uXwcarr1xoSRKi_3i3V07tG2TV8',
  });

  const onDragEnd = (): void => {
    if (mapRef.current) {
      const { map } = mapRef.current.state;
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

  const renderMap = (): JSX.Element => (
    <GoogleMap
      ref={mapRef}
      options={options}
      center={initialOptions.center}
      zoom={initialOptions.zoom}
      mapContainerStyle={{
        height: '100%',
        width: '100%',
      }}
      onDragEnd={onDragEnd}
      onZoomChanged={onDragEnd}
      onTilesLoaded={onDragEnd}
    >
      {
        // ...Your map components
      }
    </GoogleMap>
  );

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <p>loading....</p>;
};


export default Map;
