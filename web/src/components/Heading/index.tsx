import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

interface HeadingProps {
  noMargin?: boolean;
  autoBreak?: boolean;
}

export const HeadingBase = styled.div<HeadingProps>`
  margin-top: 0;
  margin-bottom: ${size(2)};
  font-weight: 700;
  line-height: 1.2;

  ${({ noMargin }) => noMargin
    && css`
      margin-bottom: 0;
    `}

  ${({ autoBreak }) => autoBreak
    && css`
      overflow-wrap: break-word;
      hyphens: auto;
    `}
`;

export const H1 = styled(HeadingBase).attrs<HeadingProps>(() => ({
  as: 'h1',
}))`
  font-weight: 900;
  font-size: 2rem;
`;

export const H2 = styled(HeadingBase).attrs<HeadingProps>(() => ({
  as: 'h2',
}))`
  font-weight: 900;
  font-size: 1.5rem;
`;

export const H3 = styled(HeadingBase).attrs<HeadingProps>(() => ({
  as: 'h3',
}))`
  font-size: 1.125rem;
`;

export const H4 = styled(HeadingBase).attrs<HeadingProps>(() => ({
  as: 'h4',
}))`
  font-size: 1rem;
`;

export const H5 = styled(HeadingBase).attrs<HeadingProps>(() => ({
  as: 'h5',
}))`
  font-size: 0.83rem;
`;

export const H6 = styled(HeadingBase).attrs<HeadingProps>(() => ({
  as: 'h6',
}))`
  font-size: 0.67rem;
`;
