import styled from 'styled-components';
import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  display: inline-flex;
  margin: 0 auto;
`;

export const RadioBox = styled.div`
  border: solid 1px ${(props) => props.theme.color.border};
  padding: ${size(1.5)} ${size(2)};

  &:first-of-type {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border-right: 0;
  }

  &:last-of-type {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;
