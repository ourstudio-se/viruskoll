import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  children?: JSX.Element | JSX.Element[];
  textCenter?: boolean;
}

const Container = ({ children, textCenter }: Props) => (
  <Wrapper textCenter={textCenter}>{children}</Wrapper>
);

export default Container;
