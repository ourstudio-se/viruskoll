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

  //const { loading } = useVirusLoader(coord);
  const loading = false;
  return (
    <>
      <h1>Home</h1>
      <Map coordinates={coordinates} onUpdateCoordinates={onUpdateCoordinates} />
      <p>{loading ? 'laddar data...' : ''}</p>
    </>
  );
};

export default withRouter(Home);
