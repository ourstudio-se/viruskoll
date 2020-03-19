import * as React from 'react';

import { TrackView } from '../../utils/tracking';
import VirusDashboard from '../../components/Virus/virus-dashboard';

const Home = (): JSX.Element => {
  React.useEffect(() => {
    TrackView()
  }, []);

  return <VirusDashboard />;
};

export default Home;
