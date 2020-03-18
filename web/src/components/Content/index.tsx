import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface IProps {
  children?: JSX.Element | JSX.Element[];
}

const Content = ({
  children,
}: IProps) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Content;
