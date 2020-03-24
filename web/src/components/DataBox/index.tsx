import React from 'react';

import {
  Wrapper,
  Label,
  Value,
  ValueMain,
  ValueSub,
} from './wrapper';

interface Props {
  label: string;
  value: string;
  subValue?: string | null;
}

const DataBox = ({
  label,
  value,
  subValue,
}: Props) => (
  <Wrapper>
    <Label>
      {label}
    </Label>
    <Value>
      <ValueMain>
        {value}
      </ValueMain>
      {subValue && (
        <ValueSub>
          {subValue}
        </ValueSub>
      )}
    </Value>
  </Wrapper>
);

export default DataBox;
