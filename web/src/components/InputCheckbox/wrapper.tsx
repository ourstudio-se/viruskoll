import * as React from 'react';
import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Label = styled.label`
  position: relative;
  display: flex;
  align-items: flex-start;
  font-size: 1rem;
  color: ${(props) => props.theme.color.textDark};
  line-height: 1.2;
  cursor: pointer;

  :before {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: ${size(2.5)};
    height: ${size(2.5)};
    margin-right: ${size(1)};
    background-color: ${(props) => props.theme.color.bg};
    color: ${(props) => props.theme.color.textOnPrimary};
    border: 1px solid ${(props) => props.theme.color.primary};
    font-size: 1rem;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    border-radius: 3px;
  }

  :hover {
    color: ${(props) => props.theme.color.primary};
  }
`;

export const Wrapper = styled((props) => <div {...props} />).attrs(
  ({ type, checked }) => ({
    role: type || 'checkbox',
    'aria-checked': checked,
  })
)`
  ${Label}:before {
    border-radius: ${({ type }) => (type === 'radio' ? '50%' : '3px')};
  }

  ${({ error }) =>
    error &&
    css`
      ${Label} {
        color: red;

        :before {
          background-color: ${(props) => props.theme.color.ui.negativeLight};
          border-color: red;
        }
      }
    `}
`;

export const Input = styled((props) => (
  <input
    {...props}
    className={`${props.checked ? 'checked' : undefined} ${props.className} `}
  />
)).attrs(({ type, checked }) => ({
  checked,
  type: type || 'checkbox',
}))`
  position: fixed;
  left: -9999px;
  opacity: 0;

  &[disabled] {
    & + ${Label} {
      color: ${(props) => props.theme.color.disabledText};

      &:before {
        background-color: ${(props) => props.theme.color.accent};
        border-color: ${(props) => props.theme.color.disabledBg};
        cursor: not-allowed;
      }
    }
  }

  &:checked,
  &.checked {
    & + ${Label} {
      :before {
        content: ${(props) => props.type === 'checkbox' && "'✓'"};
        border-color: ${(props) => props.theme.color.primary};
        background-color: ${(props) => props.theme.color.primary};
        box-shadow: ${(props) =>
          props.type === 'radio' && `inset 0 0 0 3px ${props.theme.color.bg}`};
      }
    }
  }
`;
