import * as React from 'react';

import {
  Input,
  Label,
  Wrapper,
} from './wrapper';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &{
  id: string;
  children: string | JSX.Element | JSX.Element[];
};

const InputCheckbox = ({ children, ...props }: Props): JSX.Element => {
  const { id } = props;
  return (
    <Wrapper
      aria-labelledby={id ? `${id}-label` : undefined}
    >
      <Input {...props as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} />
      <Label id={`${id}-label`} htmlFor={id}>
        {children}
      </Label>
    </Wrapper>
  );
};

export default InputCheckbox;
