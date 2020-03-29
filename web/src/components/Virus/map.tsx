import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React, { useRef, useState } from 'react';
import {
  Bounds,
  VirusModel,
  GeoLocationMetadata,
  ModalLayerData,
} from '../../@types/virus';

import Loader from '../Loader';
import { GeoObject } from '../../@types/geo';
import CombineStatsWithLayer from './map-utils/combine-stats-with-layer';
import { LatLngBoundsToBounds, hideLayers } from './map-utils/map-utils';
import {
  dataLayerStyle,
  styleMouseOver,
  styleMouseOut,
} from './map-utils/styles';
import DataLayerMouseOver from './map-events/data-layer-mouse-over';
import DataLayerMouseOut from './map-events/data-layer-mouse-out';
import DataLayerClick from './map-events/data-layer-click';
import Click from './map-events/click';
import { MapOptions } from './map-utils/options';
import LayerDataModal from './layer-data-modal';

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

const googleMapsApiKey = 'AIzaSyCtL-H9uXwcarr1xoSRKi_3i3V07tG2TV8';
const libraries = ['places'];

const Map = ({
  mapSettings,
  data,
  layer,
  onMapUpdate,
  setDataHover,
}: Map): JSX.Element => {
  const [modal, setModal] = useState<ModalLayerData | undefined>();
  const mapRef = useRef<google.maps.Map | undefined>();
  const layersRef = useRef<{ [key: string]: google.maps.Data }>({});
  const infoWindowRef = useRef<google.maps.InfoWindow | undefined>();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
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
      CombineStatsWithLayer(data.geolocations, layer, layersRef);
    }
  }, [data]);

  const onModal = (event: any) => {
    const name: string = event.feature.getProperty('name');
    const stats: GeoLocationMetadata = event.feature.getProperty('stats');
    const data: ModalLayerData = {
      name,
      ...stats,
    };
    setModal(data);
  };

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
        nextLayer.addGeoJson(layer.geo);

        layersRef.current[layer.key] = nextLayer;
        hideLayers(layersRef.current, layer.key);
        nextLayer.setMap(map);

        nextLayer.addListener('mouseover', (event) =>
          DataLayerMouseOver(event, nextLayer, setDataHover, styleMouseOver)
        );

        nextLayer.addListener('mouseout', (event) =>
          DataLayerMouseOut(event, nextLayer, setDataHover, styleMouseOut)
        );

        nextLayer.addListener('click', (event) =>
          Math.round(Math.random())
            ? DataLayerClick(event, mapRef, infoWindowRef)
            : onModal(event)
        );
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
      const bound = LatLngBoundsToBounds(bounds);
      const zoom = map.getZoom();
      onMapUpdate(bound, zoom);
    }
  };

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    map.addListener('click', () => Click(infoWindowRef));
    updateGeo();
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <>
      <LayerDataModal data={modal} onClose={() => setModal(undefined)} />
      <GoogleMap
        options={MapOptions}
        center={mapSettings.location}
        zoom={mapSettings.zoom}
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        onIdle={onUpdate}
        onLoad={onMapLoad}
      />
    </>
  ) : (
    <Loader center />
  );
};

export default Map;
