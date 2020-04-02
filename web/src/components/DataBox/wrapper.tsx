import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${(props) => props.theme.color.actionLight};
  padding: ${size(2)};
  border-radius: 4px;
`;

export const Label = styled.div`
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: ${size(0.5)};
`;

export const Value = styled.div`
  margin-top: auto;
`;

export const ValueMain = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  line-height: 1.2;
`;

export const ValueSub = styled.div`
  font-size: 0.875rem;
  line-height: 1.2;
  opacity: 0.4;

  :before {
    content: '(';
  }

  :after {
    content: ')';
  }
`;
