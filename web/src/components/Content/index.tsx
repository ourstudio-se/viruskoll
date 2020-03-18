import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const Content = ({
  children,
}: Props) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Content;
