import * as React from 'react';
import { withRouter } from 'react-router-dom';

import useVirusLoader from './useVirusLoader';
import { ICoordinate } from './models';

const coord: ICoordinate = {
  lat: 10,
  lon: 10,
};

const Home = () => {
  const { loading } = useVirusLoader(coord);
  return (
    <>
      <h1>Home</h1>
      <p>{loading ? 'laddar data...' : ''}</p>
    </>
  );
};

export default withRouter(Home);
