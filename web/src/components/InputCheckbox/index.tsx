import * as React from 'react';

import {
  Input,
  Label,
  Wrapper,
} from './wrapper';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &{
  id: string;
  children: string | JSX.Element | JSX.Element[];
}

const InputCheckbox = ({children, ...props}: Props): JSX.Element => (
  <Wrapper
    aria-labelledby={props.id ? `${props.id}-label` : undefined}
  >
    <Input {...props as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} />
    <Label id={`${props.id}-label`} htmlFor={props.id}>
      {children}
    </Label>
  </Wrapper>
);

export default InputCheckbox;
