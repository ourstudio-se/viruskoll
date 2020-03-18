import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface IProps {
  children?: JSX.Element | JSX.Element[];
  id: string;
}

const InputLabel = ({
  children,
  id,
}: IProps) => (
  <Wrapper htmlFor={id}>
    {children}
  </Wrapper>
);

export default InputLabel;
