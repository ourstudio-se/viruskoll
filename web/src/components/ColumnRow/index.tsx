import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const ColumnRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ColumnRowItem = styled.div`
  min-width: 0;

  & + & {
    padding-left: ${size(2)};
  }

  :last-child {
    flex-shrink: 0;
  }
`;
