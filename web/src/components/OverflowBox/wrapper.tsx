import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.article`
  max-height: 300px;
  padding: ${size(2)};
  background-color: ${(props) => props.theme.color.bg};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 4px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  ${(props) => props.theme.breakpoint.LtSm} {
    max-height: 200px;
  }
`;
