import React from 'react';

import { Wrapper } from './wrapper';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const OverflowBox = ({ children }: Props) => <Wrapper>{children}</Wrapper>;

export default OverflowBox;
