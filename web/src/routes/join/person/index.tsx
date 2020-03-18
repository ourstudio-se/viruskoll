import React from 'react';

import Repeat from '../../../components/Repeat';
import InputText from '../../../components/InputText';
import ManagementList from '../../../components/ManagementList';
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
      <Repeat>
        <InputText
          label="E-postadress"
          placeholder="example@email.com"
          id="join-person-email"
          name="email"
          autocomplete="email"
          description="Ange den e-postadress där du vill ta emot frågorna angående ditt välmående."
        />
      </Repeat>
      <Repeat>
        <InputText
          label="Lägg till plats"
          placeholder="Sök plats..."
          id="join-person-location"
          name="location"
          description="Ange den plats där du oftast befinner dig, såsom ditt hem."
          action="Lägg till"
        />
      </Repeat>
      <Repeat large>
        <ManagementList />
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
