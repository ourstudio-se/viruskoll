import styled from 'styled-components';

import { size } from '../../layout/helpers';

import { ButtonReset } from '../Button';
import { Wrapper as InputLabel } from '../InputLabel/wrapper';

export const Wrapper = styled.div`
  max-width: 500px;

  ${InputLabel} {
    margin-bottom: ${size(0.5)};
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Input = styled.input.attrs(() => ({
  type: 'text',
}))`
  flex: 1 1 auto;
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

export const InputAction = styled.div`
  flex-shrink: 0;
  padding-left: ${size(1)};
`;

export const InputFoldout = styled.div`
  position: absolute;
  top: calc(100% + ${size(0.5)});
  left: 0;
  right: 0;
  max-height: 400px;
  background-color: ${(props) => props.theme.color.bg};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1;
`;

export const InputFoldoutList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const InputFoldoutItem = styled.li`
  & + & {
    border-top: 1px solid ${(props) => props.theme.color.border};
  }
`;

export const InputFoldoutAction = styled(ButtonReset)`
  display: block;
  width: 100%;
  padding: ${size(1)} ${size(2)};
  text-align: left;

  :hover {
    background-color: ${(props) => props.theme.color.accent};
  }
`;
