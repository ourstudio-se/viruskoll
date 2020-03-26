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

import { IconPin } from '../Icon';
import { Location } from '../../@types/location';

const isSelected = (locations: Location[], location: Location) => {
  const sel = locations.map((x) => `${x.geolocation.lat}-${x.geolocation.lat}`);
  return sel.includes(
    `${location.geolocation.lat}-${location.geolocation.lat}`
  );
};

interface ManagementListSelectable {
  selected: Location[];
  locations: Location[];
  onRemove: (locaction: Location) => void;
  onAdd: (locaction: Location) => void;
}

const ManagementListSelectable = ({
  selected,
  locations,
  onRemove,
  onAdd,
}: ManagementListSelectable) => (
  <Wrapper>
    <Label>Välj platser:</Label>
    <List>
      {locations.map((loc, index) => (
        <Item key={`${loc.name}-${index}`}>
          <Title>
            <IconPin block />
            {loc.name}
          </Title>
          <Action>
            {isSelected(selected, loc) ? (
              <ActionBtn onClick={() => onRemove(loc)}>Ta bort</ActionBtn>
            ) : (
              <ActionBtn onClick={() => onAdd(loc)}>Välj</ActionBtn>
            )}
          </Action>
        </Item>
      ))}
    </List>
  </Wrapper>
);

export default ManagementListSelectable;
