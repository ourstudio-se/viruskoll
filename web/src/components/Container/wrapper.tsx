import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${size(3)};

  ${(props) => props.theme.breakpoint.LtSm} {
    padding: 0 ${size(2)};
  }

  ${({ textCenter }: { textCenter?: boolean }) =>
    textCenter &&
    css`
      text-align: center;
    `}
`;
