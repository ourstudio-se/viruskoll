import * as React from 'react';

import VirusDashboard from '../../components/Virus/virus-dashboard';
import useTrackView from '../../hooks/useTrackView';

const Home = (): JSX.Element => {
  useTrackView();
  return <VirusDashboard />;
};

export default Home;
