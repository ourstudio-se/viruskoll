import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface IProps {
  children?: JSX.Element | JSX.Element[];
}

const Container = ({
  children,
}: IProps) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Container;
