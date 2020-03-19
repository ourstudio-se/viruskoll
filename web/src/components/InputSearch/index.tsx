import React from 'react';

import {
  Wrapper,
  Input,
  Icon,
} from './wrapper';

import { IconSearch } from '../Icon';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &{
  placeholder: string;
  value?: string;
  id: string;
}

const InpuSearch = ({
  placeholder,
  value,
  id,
}: Props): JSX.Element => (
  <Wrapper>
    <Icon htmlFor={id}>
      <IconSearch block />
    </Icon>
    <Input
      placeholder={placeholder}
      name="search"
      value={value}
      id={id}
    />
  </Wrapper>
);

export default InpuSearch;
