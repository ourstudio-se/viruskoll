import React from 'react';

import {
  Wrapper,
  Input,
} from './wrapper';

interface IProps {
  placeholder: string;
}

const InputText = ({
  placeholder,
}: IProps) => (
  <Wrapper>
    <Input
      placeholder={placeholder}
    />
  </Wrapper>
);

export default InputText;
