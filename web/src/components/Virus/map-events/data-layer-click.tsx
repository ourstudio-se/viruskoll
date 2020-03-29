import React from 'react';
import { renderToString } from 'react-dom/server';

import DataDisplayClick from '../data-display-click';
import { GeoLocationMetadata, ModalLayerData } from '../../../@types/virus';

const DataLayerClick = (
  event: any,
  mapRef: React.MutableRefObject<google.maps.Map<Element> | undefined>,
  infoWindowRef: React.MutableRefObject<google.maps.InfoWindow | undefined>
) => {
  if (infoWindowRef.current) {
    infoWindowRef.current.close();
  }

  const name: string = event.feature.getProperty('name');
  const stats: GeoLocationMetadata = event.feature.getProperty('stats');
  const data: ModalLayerData = {
    name,
    ...stats,
  };

  const content = renderToString(<DataDisplayClick data={data} />);

  const infowindow = new google.maps.InfoWindow({
    content,
  });

  const location = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  };

  infowindow.setPosition(location);
  infowindow.open(mapRef.current);
  infoWindowRef.current = infowindow;
};

export default DataLayerClick;
