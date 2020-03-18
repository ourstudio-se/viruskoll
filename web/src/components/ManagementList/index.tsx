import React from 'react';

import {
  Wrapper,
  Label,
  List,
  Item,
  Title,
  Action,
  ActionBtn,
} from './wrapper';

const ManagementList = () => (
  <Wrapper>
    <Label>
      Dina platser:
    </Label>
    <List>
      <Item>
        <Title>
          Kungsgatan 50, 411 35 Göteborg
        </Title>
        <Action>
          <ActionBtn>
            Ta bort
          </ActionBtn>
        </Action>
      </Item>
      <Item>
        <Title>
          Kungsgatan 50, 411 35 Göteborg
        </Title>
        <Action>
          <ActionBtn>
            Ta bort
          </ActionBtn>
        </Action>
      </Item>
    </List>
  </Wrapper>
);

export default ManagementList;
