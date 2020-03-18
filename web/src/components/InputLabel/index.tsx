import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface Props {
  children?: JSX.Element | JSX.Element[] | string;
  id: string;
}

const InputLabel = ({
  children,
  id,
}: Props): JSX.Element => (
  <Wrapper htmlFor={id}>
    {children}
  </Wrapper>
);

export default InputLabel;
