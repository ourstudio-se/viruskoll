import styled from 'styled-components';

import { size } from '../../layout/helpers';
import { ButtonReset } from '../Button';

export const Wrapper = styled.div`

`;

export const Label = styled.div`
  color: ${(props) => props.theme.color.textDarkLighten};
  margin-bottom: ${size(1)};
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: ${size(-1)} 0;
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  padding: ${size(1)} 0;

  & + & {
    border-top: 1px solid ${(props) => props.theme.color.border};
  }
`;

export const Title = styled.div`
  flex: 1 1 auto;
`;

export const Action = styled.div`
  flex-shrink: 0;
  padding-left: ${size(2)};
`;

export const ActionBtn = styled(ButtonReset)`
  display: block;
  color: red;

  :hover {
    text-decoration: underline;
  }
`;
