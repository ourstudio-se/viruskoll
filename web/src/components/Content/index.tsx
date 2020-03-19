import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface Props {
  children?: JSX.Element | JSX.Element[];
  fullWidth?: boolean;
}

const Content = ({
  children,
  fullWidth,
}: Props) => (
  <Wrapper fullWidth={fullWidth}>
    {children}
  </Wrapper>
);

export default Content;
