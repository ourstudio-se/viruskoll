import * as React from 'react';
import { withRouter } from 'react-router-dom';


import useVirusLoader, { VirusPayload } from './useVirusLoader';
import { ICoordinates, InitialMapOptions } from './models';
import Map from './map';

const initialCoordinates: ICoordinates = {
  lat: 57.6724373,
  lng: 12.1083129,
}


const initialOptions: InitialMapOptions = {
  center: initialCoordinates,
  zoom: 5,
}

interface MapState {
  bounds: google.maps.LatLngBounds;
  zoom: number;
}

const Home = () => {
  const [coordinates, setCoordinates] = React.useState<ICoordinates>(initialCoordinates);
  const [mapState, setMapState] = React.useState<MapState | undefined>()

  const payload: VirusPayload | undefined = React.useMemo(() => {
    if (!mapState) {
      return undefined;
    }

    const sw =  mapState.bounds.getSouthWest();
    const ne =  mapState.bounds.getNorthEast();
    return {
      precision: mapState.zoom,
      sw: {
        lat: sw.lat(),
        lon: sw.lng()
      },
      new: {
        lat: ne.lat(),
        lon: ne.lng()
      },
    }
  }, [mapState]);

  /*
  const onUpdateCoordinates = React.useCallback(
    (nextCoordinates: ICoordinates) => setCoordinates(nextCoordinates), []);
  */

  const onMapUpdate = React.useCallback(
      (bounds: google.maps.LatLngBounds, zoom: number) => setMapState({ bounds, zoom}), []);

  const { data } = useVirusLoader(payload);
  console.log(data);
  return (
    <>
      <Map initialOptions={initialOptions} onMapUpdate={onMapUpdate} />
    </>
  );
};

export default withRouter(Home);
