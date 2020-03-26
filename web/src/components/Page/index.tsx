import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const Page = ({ children }: Props): JSX.Element => (
  <Wrapper>{children}</Wrapper>
);

export default Page;
