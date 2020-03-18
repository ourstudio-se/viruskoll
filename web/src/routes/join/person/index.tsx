import React from 'react';

import Repeat from '../../../components/Repeat';
import InputText from '../../../components/InputText';
import { Button } from '../../../components/Button';

interface Person {
  visible: boolean;
}

const Person = ({
  visible,
}): JSX.Element | null => {
  if (!visible) {
    return null;
  }

  return (
    <>
      <Repeat large>
        <InputText
          label="E-post"
          placeholder="example@email.com"
          id="join-person-email"
          name="email"
          autocomplete="email"
          description="Ange den e-postadress där du vill ta emot frågorna angående ditt välmående."
        />
      </Repeat>
      <Repeat large>
        <Button>
          Gå med
        </Button>
      </Repeat>
    </>
  );
};

export default Person;
