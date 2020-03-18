import React from 'react';

import {
  Wrapper,
} from './wrapper';

interface IProps {
  children?: JSX.Element | JSX.Element[];
}

const Page = ({
  children,
}: IProps) => (
  <Wrapper>
    {children}
  </Wrapper>
);

export default Page;
