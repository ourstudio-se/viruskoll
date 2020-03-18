import * as React from 'react';
import { withRouter } from 'react-router-dom';


import useVirusLoader from './useVirusLoader';
import { ICoordinates } from './models';
import Map from './map';

const initialCoordinates: ICoordinates = {
  lat: 57.6724373,
  lng: 12.1083129,
}

const Home = () => {
  const [coordinates, setCoordinates] = React.useState<ICoordinates>(initialCoordinates);

  const onUpdateCoordinates = React.useCallback(
    (nextCoordinates: ICoordinates) => setCoordinates(nextCoordinates), []);

  // const { loading } = useVirusLoader(coord);
  const loading = false;
  return (
    <>
      <Map coordinates={coordinates} onUpdateCoordinates={onUpdateCoordinates} />
      <div>{loading ? 'laddar data...' : ''}</div>
    </>
  );
};

export default withRouter(Home);
