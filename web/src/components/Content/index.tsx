import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface Props {
  children?: JSX.Element | JSX.Element[];
  fullWidth?: boolean;
  center?: boolean;
  textCenter?: boolean;
}

const Content = ({
  children,
  fullWidth,
  center,
  textCenter,
}: Props) => (
  <Wrapper fullWidth={fullWidth} center={center} textCenter={textCenter}>
    {children}
  </Wrapper>
);

export default Content;
