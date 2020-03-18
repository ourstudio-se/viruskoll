import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

import { Wrapper as InputLabel } from '../InputLabel/wrapper';

export const Wrapper = styled.div`
  ${InputLabel} {
    margin-bottom: ${size(0.5)};
  }
`;

export const Input = styled.input.attrs(() => ({
  type: 'text',
}))`
  display: block;
  width: 100%;
  height: ${(props) => props.theme.distances.inputHeight};
  padding: 0 ${size(2)};
  font-size: 16px;
  background-color: ${(props) => props.theme.color.bg};
  border: 1px solid ${(props) => props.theme.color.border};
  border-radius: 4px;

  &[disabled] {
    background-color: ${(props) => props.theme.color.disabledBg};
    color: ${(props) => props.theme.color.disabledText};
    opacity: 1; // Required to display correct color in Safari
  }

  &::-webkit-input-placeholder {
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.color.placeholder};
    font-size: 1em;
  }

  &:-moz-placeholder {
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.color.placeholder};
    font-size: 1em;
  }

  &::-moz-placeholder {
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.color.placeholder};
    font-size: 1em;
  }

  &:-ms-input-placeholder {
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.color.placeholder};
    font-size: 1em;
  }
`;

export const Description = styled.div`
  margin-top: ${size(0.5)};
  color: ${(props) => props.theme.color.textDarkLighten};
  font-size: 0.875rem;
`;
