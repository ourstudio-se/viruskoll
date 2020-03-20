import React from 'react';

import {
  OuterWrapper,
  Wrapper,
  Select,
  Option,
  Icon,
} from './wrapper';

import { IconChevronDown } from '../Icon';
import InputLabel from '../InputLabel';

export interface Option {
  value: number | string;
  displayName: number | string;
}

type IProps = React.DetailedHTMLProps<
React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>& {
  label?: string;
  options: Option[];
  ref?: ((instance: HTMLSelectElement | null) => void)
  | React.RefObject<HTMLSelectElement> | null | undefined;
};

const SelectInput = ({
  options,
  label,
  ...props
}: IProps): JSX.Element => {
  const { id } = props;
  return (
    <OuterWrapper>
      {label && (
        <InputLabel>
          {label}
        </InputLabel>
      )}
      <Wrapper>
        <Select {...props}>
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.displayName}
            </Option>
          ))}
        </Select>
        <Icon>
          <IconChevronDown />
        </Icon>
      </Wrapper>
    </OuterWrapper>
  );
};

export default SelectInput;
