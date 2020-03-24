import React from 'react';

import {
  Item,
  Button,
} from './wrapper';

const Tab = ({
  displayName,
  active,
  onClick,
}) => (
  <Item>
    <Button active={active} onClick={onClick}>
      {displayName}
    </Button>
  </Item>
);

export default Tab;
