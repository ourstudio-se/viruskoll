import * as React from 'react';

import Routes from '../../routes';

import Header from '../Header';
import { PortalElement, PortalNamespace } from '../Portal';

const App = () => (
  <>
    <Header />
    <Routes />
    <PortalElement id={PortalNamespace.DefaultPortal} />
  </>
);

export default App;
