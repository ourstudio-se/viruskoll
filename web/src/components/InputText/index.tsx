import React from 'react';

import {
  Wrapper,
  Input,
} from './wrapper';

interface Props {
  placeholder: string;
}

const InputText = ({
  placeholder,
}: Props): JSX.Element => (
  <Wrapper>
    <Input
      placeholder={placeholder}
    />
  </Wrapper>
);

export default InputText;
