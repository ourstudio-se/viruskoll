import React from 'react';

import {
  Wrapper,
  List,
  Item,
  Button,
} from './wrapper';

const ToggleTabs = ({
  currentTab,
  onTabChange
}) => (
  <Wrapper>
    <List>
      <Item>
        <Button active={currentTab === 0 ? true : undefined} onClick={() => onTabChange(0)}>
          Person
        </Button>
      </Item>
      <Item>
        <Button active={currentTab === 1 ? true : undefined} onClick={() => onTabChange(1)}>
          Företag
        </Button>
      </Item>
    </List>
  </Wrapper>
);

export default ToggleTabs;
