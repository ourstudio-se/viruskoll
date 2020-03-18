import * as React from 'react';
import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const HeadingBase = styled(({ noMargin, ...props }) => <div {...props} />)`
  margin-top: 0;
  margin-bottom: ${size(2)};
  font-weight: 700;
  line-height: 1.2;

  ${({ noMargin }: { noMargin: boolean }) =>
    noMargin &&
    css`
      margin-bottom: 0;
    `}
`;

export const H1 = styled(HeadingBase).attrs(() => ({
  as: 'h1',
}))`
  font-size: 2rem;
`;

export const H2 = styled(HeadingBase).attrs(() => ({
  as: 'h2',
}))`
  font-size: 1.5rem;
`;

export const H3 = styled(HeadingBase).attrs(() => ({
  as: 'h3',
}))`
  font-size: 1.125rem;
`;

export const H4 = styled(HeadingBase).attrs(() => ({
  as: 'h4',
}))`
  font-size: 1rem;
`;

export const H5 = styled(HeadingBase).attrs(() => ({
  as: 'h5',
}))`
  font-size: 0.83rem;
`;

export const H6 = styled(HeadingBase).attrs(() => ({
  as: 'h6',
}))`
  font-size: 0.67rem;
`;
