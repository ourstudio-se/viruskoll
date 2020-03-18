import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`

`;

export const Input = styled.input.attrs(() => ({
  type: 'text',
  placeholder: ({ placeholder }: { placeholder: string }) => placeholder || '',
}))`
  display: block;
  width: 100%;
  padding: ${size(1)};
`;
