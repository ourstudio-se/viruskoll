import React from 'react';

import {
  Wrapper,
  Label,
  Value,
  ValueMain,
  ValueSub,
} from './wrapper';

interface IProps {
  label: string;
  value: string;
  subValue?: string;
}

const DataBox = ({
  label,
  value,
  subValue,
}: IProps) => (
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
