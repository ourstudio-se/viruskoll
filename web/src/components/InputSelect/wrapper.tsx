import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';
import { Wrapper as InputLabel } from '../InputLabel/wrapper';

export const OuterWrapper = styled.div`
  ${InputLabel} {
    margin-bottom: ${size(0.5)};
  }
`;

export const Wrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.color.bg};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 4px;
  overflow: hidden;

  ${({ maxWidth }: { maxWidth?: boolean }) => maxWidth
    && css`
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    `}
`;

export const Select = styled.select`
  height: 48px;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-indent: 0.01px;
  border: 0;
  height: ${(props) => props.theme.distances.inputHeight};
  padding: 0 ${size(2)};
  background-color: transparent;
  color: ${(props) => props.theme.color.textDark};
  border-radius: 0;
  font-size: 16px;
  cursor: pointer;
  z-index: 1;

  :focus {
    outline: none;
  }

  ::-ms-expand {
    display: none;
  }

  ::-moz-focus-inner {
    border: 0;
  }
`;

export const Option = styled.option`
  color: ${(props) => props.theme.color.textDark};
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-right: ${size(2)};
  background-color: ${(props) => props.theme.color.bg};
  color: ${(props) => props.theme.color.textDark};
  z-index: 2;
  font-size: 0.875rem;
  line-height: 1;
  pointer-events: none;

  :before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 100%;
    width: ${size(4)};
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), ${(props) => props.theme.color.bg});
  }
`;
