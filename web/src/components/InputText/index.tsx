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

interface Props {
  placeholder: string;
  id: string;
  label?: string;
  name?: string;
  autocomplete?: string;
  description?: string;
  foldout?: boolean;
  action?: string;
}

const InputText = ({
  placeholder,
  id,
  label,
  name,
  autocomplete,
  description,
  foldout,
  action,
}: Props) => (
  <Wrapper>
    {label && (
      <InputLabel id={id}>
        {label}
      </InputLabel>
    )}
    <InputWrapper>
      <Input
        placeholder={placeholder}
        name={name}
        autocomplete={autocomplete}
        id={id}
      />
      {action && (
        <InputAction>
          <Button inputHeight disabled>
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
    {description && (
      <Description>
        {description}
      </Description>
    )}
  </Wrapper>
);

export default InputText;
