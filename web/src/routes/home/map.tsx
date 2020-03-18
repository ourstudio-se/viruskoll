import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React, { useRef } from 'react';
import { InitialMapOptions, Bounds, VirusModel } from './models';

const options = {
  fullscreenControl: false,
  streetViewControl: false,
};

interface Map {
  data: VirusModel;
  initialOptions: InitialMapOptions;
  onMapUpdate: (bounds: Bounds, zoom: number) => void;
}

let circles = [];

const Map = ({
  data,
  initialOptions,
  onMapUpdate,
}: Map): JSX.Element => {
  const mapRef = useRef<GoogleMap>();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCtL-H9uXwcarr1xoSRKi_3i3V07tG2TV8',
  });

  React.useEffect(() => {
    if (mapRef.current && circles.length) {
      circles.map(x => x.setMap(null));
      circles = [];
    }
    if (data && data.geolocations && !!data.geolocations.length && mapRef.current) {
      const { map } = mapRef.current.state;
      data.geolocations.map(loc => {
        const circle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: {
            lat: loc.geolocation.lat,
            lng: loc.geolocation.lon,
          },
          radius: Math.sqrt(loc.doc_count) * 10000
        });
        circles.push(circle);
      })

    }
  }, [data]);

  const onUpdate = (): void => {
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

  const renderMap = (): JSX.Element => {
    
    
    return (
      <GoogleMap
        ref={mapRef}
        options={options}
        center={initialOptions.center}
        zoom={initialOptions.zoom}
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        onIdle={onUpdate}
      >
        {
          // ...Your map components
        }
      </GoogleMap>
    );
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <p>loading....</p>;
};


export default Map;
