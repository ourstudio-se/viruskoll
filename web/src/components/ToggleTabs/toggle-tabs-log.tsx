import React from 'react';

import { Wrapper, List, Item, Button } from './wrapper';

const ToggleTabsLog = ({ active, onClick }) => (
  <Wrapper>
    <List>
      <Item>
        <Button
          active={active && active !== undefined ? true : undefined}
          onClick={onClick}
        >
          Ja
        </Button>
      </Item>
      <Item>
        <Button
          active={active || active === undefined ? undefined : true}
          onClick={onClick}
        >
          Nej
        </Button>
      </Item>
    </List>
  </Wrapper>
);

export default ToggleTabsLog;
