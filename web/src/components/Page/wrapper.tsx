import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.main`
  padding: ${size(8)} 0;

  ${(props) => props.theme.breakpoint.LtMd} {
    padding: ${size(4)} 0;
  }
`;
