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
  setDataHover: (obj: ModalLayerData) => void;
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
  const layerRef = useRef(layer);
  const infoWindowRef = useRef<google.maps.InfoWindow | undefined>();
  const selectedFeature = useRef<google.maps.Data.Feature | undefined>();

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
    layerRef.current = layer;
  }, [layer]);

  const populateMapWithData = React.useCallback(() => {
    if (
      data?.geolocations &&
      layer?.zoom &&
      layersRef.current[layer?.zoom] &&
      data.zoom === layer.zoom &&
      mapRef.current
    ) {
      CombineStatsWithLayer(data.geolocations, layer, layersRef);
    }
  }, [data, layer]);

  React.useEffect(() => {
    populateMapWithData();
  }, [data, layer]);

  const onModal = (
    event: any,
    l: google.maps.Data,
    s: google.maps.Data.StyleOptions
  ) => {
    if (selectedFeature.current) {
      l.overrideStyle(selectedFeature.current, styleMouseOut);
    }

    l.overrideStyle(event.feature, s);
    selectedFeature.current = event.feature;
    const name: string = event.feature.getProperty('name');
    const stats: GeoLocationMetadata = event.feature.getProperty('stats');
    const data: ModalLayerData = {
      name,
      ...stats,
    };
    setDataHover(data);
  };

  const updateGeo = React.useCallback(() => {
    const map = mapRef.current;
    if (map && layer) {
      const cachedLayer = layersRef.current[layer.zoom];
      if (cachedLayer) {
        hideLayers(layersRef.current, layer.zoom);
        cachedLayer.setMap(map);
      } else {
        const nextLayer = new google.maps.Data();
        nextLayer.setStyle(dataLayerStyle);
        nextLayer.addGeoJson(layer.geo);

        layersRef.current[layer.zoom] = nextLayer;
        hideLayers(layersRef.current, layer.zoom);
        nextLayer.setMap(map);

        nextLayer.addListener('mouseover', (event) =>
          DataLayerMouseOver(event, nextLayer, styleMouseOver, selectedFeature)
        );

        nextLayer.addListener('mouseout', (event) =>
          DataLayerMouseOut(event, nextLayer, styleMouseOut, selectedFeature)
        );

        nextLayer.addListener('click', (event) =>
          onModal(event, nextLayer, styleMouseOver)
        );
        populateMapWithData();
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

  const onOutsideMapClick = React.useCallback(() => {
    if (selectedFeature.current) {
      layersRef.current[layerRef.current.zoom].overrideStyle(
        selectedFeature.current,
        styleMouseOut
      );
    }
    setDataHover(undefined);
    Click(infoWindowRef);
  }, [layer]);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    map.addListener('click', onOutsideMapClick);
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
