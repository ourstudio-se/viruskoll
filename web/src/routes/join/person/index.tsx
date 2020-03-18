import React from 'react';

import InputText from '../../../components/InputText';

interface Person {
  visible: boolean;
}

const Person = ({
  visible,
}) => (
  <>
    <div>Namn{visible}</div>
    <InputText
      placeholder="Namn"
    />

    <div>Domän</div>
    <input />

    <button type="button">Gå med</button>
  </>
);

export default Person;
