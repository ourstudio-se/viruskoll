import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React, { useRef } from 'react';
import { Bounds, VirusModel } from '../../@types/virus';

import Loader from '../Loader';
import { gradientGreenBlueRed, mapStyle } from './map-utils';

declare global {
  interface Window {
      radius?: number;
  }
}

const options: google.maps.MapOptions = {
  styles: mapStyle,
  fullscreenControl: false,
  streetViewControl: false,
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

const libraries = ['places', 'visualization'];

const mapOptions: google.maps.visualization.HeatmapLayerOptions = {
  // gradient: gradientGreenBlueRed,
  radius: 30,
  data: [],
}

const Map = ({
  mapSettings,
  data,
  onMapUpdate,
}: Map): JSX.Element => {
  const heatMapRef = React.useRef<google.maps.visualization.HeatmapLayer>();
  const mapRef = useRef<GoogleMap>();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCtL-H9uXwcarr1xoSRKi_3i3V07tG2TV8',
    libraries
  });

  React.useEffect(() => {
    if (mapSettings && mapRef.current) {
      mapRef.current.state.map.panTo(mapSettings.location);
      mapRef.current.state.map.setZoom(mapSettings.zoom);
    }
  }, [mapSettings])


  React.useEffect(() => {
    if (data && data.geolocations && mapRef.current) {
      const { map } = mapRef.current.state;

      const healthy = data.healthy.reduce((prev, cur) => {
        const next = prev + cur.count
        return next;
      }, 0)
      // const unhealthyTotal = data.count - healthy
      const heatMapData = data.geolocations
        //.filter(loc => (loc.unhealthy.count +  loc.healthy.count) > 5)
        .map(loc => {
        // currently displaying total unhealty
        const weight = loc.unhealthy
          ? (loc.unhealthy.count / (loc.unhealthy.count + loc.healthy.count)) * 100
          : 0;
          

        console.log(weight);
        return {
          weight,
          location: new google.maps.LatLng(loc.geolocation.lat, loc.geolocation.lon),
        }
      })

      const heatmapOptions = {
        ...mapOptions,
        data: heatMapData,
        maxIntensity: 50,
      }

      if (heatMapRef.current) {
        heatMapRef.current.setData([]);
        heatMapRef.current.setOptions(heatmapOptions)
      } else {
        const heatmap = new google.maps.visualization.HeatmapLayer(heatmapOptions);
        heatmap.setMap(map);
        heatMapRef.current = heatmap;
      }
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
        center={mapSettings.location}
        zoom={mapSettings.zoom}
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        onIdle={onUpdate}
      />
    );
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <Loader center />;
};

export default Map;
