import React from 'react';
import InputCheckbox from '../InputCheckbox';
import { Wrapper, RadioBox } from './wrapper';

const RadioToggle = ({ onChange, name }) => (
  <Wrapper>
    <RadioBox>
      <InputCheckbox
        id={`radiotoggle-${name}-yes`}
        name={name}
        type="radio"
        value={1}
        onChange={onChange}
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
        onChange={onChange}
      >
        Nej
      </InputCheckbox>
    </RadioBox>
  </Wrapper>
);

export default RadioToggle;
