import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  & + & {
    margin-top: ${size(2)};
  }

  ${({ small }: { small: boolean }) => small
    && css`
      & + & {
        margin-top: ${size(1)};
      }
    `}

  ${({ large }: { large: boolean }) => large
    && css`
      & + & {
        margin-top: ${size(4)};
      }
    `}
`;
