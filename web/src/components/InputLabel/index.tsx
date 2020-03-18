import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface Props {
  children?: JSX.Element | JSX.Element[];
  id: string;
}

const InputLabel = ({
  children,
  id,
}: Props) => (
  <Wrapper htmlFor={id}>
    {children}
  </Wrapper>
);

export default InputLabel;
