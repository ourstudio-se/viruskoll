import * as React from 'react';
import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const ButtonReset = styled.button`
  display: inline-block;
  vertical-align: middle;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  font-family: ${(props) => props.theme.font};
  font-size: 1em;
  color: currentColor;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;

  ::-moz-focus-inner {
    border: 0;
  }
`;

export const Button = styled(ButtonReset)`
  padding: ${size(2)} ${size(4)};
  border-radius: 4px;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.textOnPrimary};
  font-weight: 700;
  font-size: 0.875rem;
  transform-origin: 50% 50%;
  transition: transform 200ms ease;

  :active {
    transform: scale(0.95);
  }

  &[disabled] {
    background-color: ${(props) => props.theme.color.disabledBg};
    color: ${(props) => props.theme.color.disabledText};
    cursor: default;
  }

  ${({ inputHeight }: { inputHeight: boolean }) =>
    inputHeight &&
    css`
      height: ${(props) => props.theme.distances.inputHeight};
      padding-top: 0;
      padding-bottom: 0;
    `}
`;
