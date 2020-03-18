import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  background-color: ${(props) => props.theme.color.primaryLight};
  padding: ${size(2)};
  border-radius: 4px;
`;

export const Label = styled.div`
  font-weight: 700;
  font-size: 0.875rem;
`;

export const Value = styled.div`

`;

export const ValueMain = styled.div`
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.2;
`;

export const ValueSub = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.color.textDarkLighten};

  :before {
    content: '(';
  }

  :after {
    content: ')';
  }
`;
