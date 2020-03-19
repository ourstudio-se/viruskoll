import * as React from 'react';

import {
  Input,
  Label,
  Wrapper,
} from './wrapper';

interface Props {
  id: string;
  children: JSX.Element | JSX.Element[];
}

const InputCheckbox = ({ id, children, ...props }: Props) => (
  <Wrapper
    aria-labelledby={id ? `${id}-label` : undefined}
  >
    <Input {...props} id={id} />
    <Label id={`${id}-label`} htmlFor={id}>
      {children}
    </Label>
  </Wrapper>
);

export default InputCheckbox;
