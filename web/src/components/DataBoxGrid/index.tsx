import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const DataBoxGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: ${size(-0.5)};
`;

export const DataBoxGridItem = styled.div`
  flex: 1 1 auto;
  width: 50%;
  max-width: 50%;
  padding: ${size(0.5)};
`;
