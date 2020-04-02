import React from 'react';
import InputCheckbox from '../InputCheckbox';
import { Wrapper, RadioBox } from './wrapper';

const RadioToggle = ({ onChange, name }) => {
  const localOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = Boolean(parseInt(e.currentTarget.value, 10));
    onChange(isChecked);
  };

  return (
    <Wrapper>
      <RadioBox>
        <InputCheckbox
          id={`radiotoggle-${name}-yes`}
          name={name}
          type="radio"
          value={1}
          onChange={localOnChange}
        >
          Ja
        </InputCheckbox>
      </RadioBox>
      <RadioBox>
        <InputCheckbox
          id={`radiotoggle-${name}-no`}
          name={name}
          type="radio"
          value={0}
          onChange={localOnChange}
        >
          Nej
        </InputCheckbox>
      </RadioBox>
    </Wrapper>
  );
};

export default RadioToggle;
