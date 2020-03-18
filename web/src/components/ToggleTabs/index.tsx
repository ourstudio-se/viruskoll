import React from 'react';

import {
  Wrapper,
  List,
  Item,
  Button,
} from './wrapper';

const ToggleTabs = () => (
  <Wrapper>
    <List>
      <Item>
        <Button active>
          Person
        </Button>
      </Item>
      <Item>
        <Button>
          Organisation
        </Button>
      </Item>
    </List>
  </Wrapper>
);

export default ToggleTabs;
