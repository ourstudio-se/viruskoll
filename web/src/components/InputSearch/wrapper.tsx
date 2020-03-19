import styled from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  background-color: ${(props) => props.theme.color.accent};
  border-radius: 4px;
`;

export const Icon = styled.label`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-left: ${size(2)};
`;

export const Input = styled.input.attrs(() => ({
  type: 'text',
}))`
  flex: 1 1 auto;
  display: block;
  width: 100%;
  height: ${(props) => props.theme.distances.inputHeight};
  padding: 0 ${size(2)};
  background-color: transparent;
  font-size: 16px;
  border: none;

  :focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.color.textDarkLighten};
    font-size: 1em;
  }

  &:-moz-placeholder {
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.color.textDarkLighten};
    font-size: 1em;
  }

  &::-moz-placeholder {
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.color.textDarkLighten};
    font-size: 1em;
  }

  &:-ms-input-placeholder {
    font-family: ${(props) => props.theme.font};
    color: ${(props) => props.theme.color.textDarkLighten};
    font-size: 1em;
  }
`;
