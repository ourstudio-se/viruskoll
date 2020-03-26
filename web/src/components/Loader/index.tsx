import * as React from 'react';

import { Spinner, Wrapper } from './wrapper';

const Loader = (props) => (
  <Wrapper {...props}>
    <Spinner />
  </Wrapper>
);

export default Loader;
