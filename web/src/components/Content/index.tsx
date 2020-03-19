import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface Props {
  children?: JSX.Element | JSX.Element[];
  fullWidth?: boolean;
  center?: boolean;
}

const Content = ({
  children,
  fullWidth,
  center,
}: Props) => (
  <Wrapper fullWidth={fullWidth} center={center}>
    {children}
  </Wrapper>
);

export default Content;
