import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';
import { rotate } from '../../layout/keyframes';

export const Spinner = styled.div`
  display: block;
  margin: 0 auto;
  width: ${size(4)};
  height: ${size(4)};
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: ${rotate} 600ms linear infinite;
`;

type Wrapper = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  inline?: boolean;
  inlineBlock?: boolean;
  center?: boolean;
  spacing?: boolean;
} 

export const Wrapper = styled.div<Wrapper>`
  color: ${props => props.theme.color.primary};

  ${({ inline }) =>
    inline &&
    css`
      display: inline-block;
      vertical-align: middle;
      color: currentColor;

      ${Spinner} {
        width: 1em;
        height: 1em;
      }
    `}

  ${({ inlineBlock }) =>
    inlineBlock &&
    css`
      display: block;
      color: currentColor;

      ${Spinner} {
        width: 1em;
        height: 1em;
      }
    `}

  ${({ center }) =>
    center &&
    css`
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `}

  ${({ spacing }) =>
    spacing &&
    css`
      padding-top: ${size(4)};
      bottom-top: ${size(4)};
    `}
`;
