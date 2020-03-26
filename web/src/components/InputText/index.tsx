import React from 'react';

import {
  Wrapper,
  InputWrapper,
  Input,
  InputAction,
  InputFoldout,
  InputFoldoutList,
  InputFoldoutItem,
  InputFoldoutAction,
  Description,
} from './wrapper';

import InputLabel from '../InputLabel';
import { Button } from '../Button';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  placeholder: string;
  id: string;
  label?: string;
  name?: string;
  autocomplete?: string;
  description?: string;
  foldout?: boolean;
  action?: string;
  onClick?: () => void;
  disabledAction?: boolean;
};

const InputText = ({
  placeholder,
  id,
  label,
  name,
  autocomplete,
  description,
  foldout,
  action,
  value,
  onChange,
  onClick,
  disabledAction,
}: Props): JSX.Element => (
  <Wrapper>
    {label && <InputLabel id={id}>{label}</InputLabel>}
    <InputWrapper>
      <Input
        placeholder={placeholder}
        name={name}
        autoComplete={autocomplete}
        id={id}
        value={value}
        onChange={onChange}
      />
      {action && (
        <InputAction>
          <Button inputHeight onClick={onClick} disabled={disabledAction}>
            {action}
          </Button>
        </InputAction>
      )}
      {foldout && (
        <InputFoldout>
          <InputFoldoutList>
            <InputFoldoutItem>
              <InputFoldoutAction>
                Ananasgatan 8, 514 35 Tranemo
              </InputFoldoutAction>
            </InputFoldoutItem>
            <InputFoldoutItem>
              <InputFoldoutAction>
                Ananasgatan 8, 514 35 Tranemo
              </InputFoldoutAction>
            </InputFoldoutItem>
            <InputFoldoutItem>
              <InputFoldoutAction>
                Ananasgatan 8, 514 35 Tranemo
              </InputFoldoutAction>
            </InputFoldoutItem>
          </InputFoldoutList>
        </InputFoldout>
      )}
    </InputWrapper>
    {description && <Description>{description}</Description>}
  </Wrapper>
);

export default InputText;
