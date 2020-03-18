import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const Container = ({
  children,
}: Props) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Container;
