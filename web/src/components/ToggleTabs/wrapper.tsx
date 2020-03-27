import styled, { css } from 'styled-components';

import { ButtonReset } from '../Button';
import { size } from '../../layout/helpers';

export const Wrapper = styled.div``;

export const List = styled.ul`
  display: inline-flex;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid ${(props) => props.theme.color.primary};
  border-radius: 4px;
`;

export const Item = styled.li`
  display: inline-block;
  vertical-align: top;

  :first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  :last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  & + & {
    border-left: 1px solid ${(props) => props.theme.color.primary};
  }
`;

export const Button = styled(ButtonReset)`
  display: block;
  padding: ${size(1)} ${size(3)};
  color: ${(props) => props.theme.color.primary};
  font-weight: 700;
  font-size: 0.875rem;

  ${({ active }: { active: boolean }) =>
    active &&
    css`
      background-color: ${(props) => props.theme.color.primary};
      color: ${(props) => props.theme.color.textOnPrimary};
    `}
`;
