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

import { Location } from '../../@types/location';
import { IconPin } from '../Icon';

interface ManagementList {
  locations: Location[];
  onRemove: (index: number) => void;
}

const ManagementList = ({ locations, onRemove }: ManagementList) => (
  <Wrapper>
    <Label>Dina platser:</Label>
    <List>
      {locations.map((loc, index) => (
        <Item key={`${loc.name}-${index}`}>
          <Title>
            <IconPin block />
            {loc.name}
          </Title>
          <Action>
            <ActionBtn onClick={() => onRemove(index)}>Ta bort</ActionBtn>
          </Action>
        </Item>
      ))}
    </List>
  </Wrapper>
);

export default ManagementList;
