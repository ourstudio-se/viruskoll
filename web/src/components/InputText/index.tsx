import React from 'react';

import {
  Wrapper,
  Input,
  Description,
} from './wrapper';

import InputLabel from '../InputLabel';

interface IProps {
  placeholder: string;
  id: string;
  label?: string;
  name?: string;
  autocomplete?: string;
  description?: string;
}

const InputText = ({
  placeholder,
  id,
  label,
  name,
  autocomplete,
  description,
}: IProps) => (
  <Wrapper>
    {label && (
      <InputLabel id={id}>
        {label}
      </InputLabel>
    )}
    <Input
      placeholder={placeholder}
      name={name}
      autocomplete={autocomplete}
      id={id}
    />
    {description && (
      <Description>
        {description}
      </Description>
    )}
  </Wrapper>
);

export default InputText;
