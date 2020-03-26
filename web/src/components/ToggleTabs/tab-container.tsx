import React from 'react';

import { Wrapper, List } from './wrapper';

const TabContainer = ({ children }) => (
  <Wrapper>
    <List>{children}</List>
  </Wrapper>
);

export default TabContainer;
