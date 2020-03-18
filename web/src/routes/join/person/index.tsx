import React from 'react';

import Repeat from '../../../components/Repeat';
import InputText from '../../../components/InputText';
import ManagementList from '../../../components/ManagementList';
import { Button } from '../../../components/Button';
import { Person } from '../models';
import usePersonRegistration from './usePersonRegistration';

import { payloadIsValid } from './validation';
import Content from '../../../components/Content';

const init: Person = {
  birthYear: 0,
  email: '',
  emailVerified: false,
  gender: '',
  organizations: []
}

interface PersonView {
  visible: boolean;
}

const PersonView = ({
  visible,
}: PersonView): JSX.Element | null => {
  const {register, creating, failed, data} = usePersonRegistration()
  const [search, setSearch] = React.useState('');
  const [person, setPerson] = React.useState(init);

  const onSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value), []);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPerson({
    ...person,
    [e.currentTarget.name]: e.currentTarget.value,
  }),[person]);

  const onRegister = React.useCallback(() => {
    register(person);
  }, [person]);

  const isValid = React.useMemo(() => payloadIsValid(person), [person]);

  if (!visible) {
    return null;
  }

  if (data) {
    return (
      <>
        <p>Registrering lyckades, tack!</p>
      </>
    )
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
          value={person.email}
          onChange={onChange}
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
          value={search}
          onChange={onSearch}
        />
      </Repeat>
      <Repeat large>
        <ManagementList />
      </Repeat>
      {failed && (
         <Repeat large>
          <Content>
            <p>Ett fel uppstod, försök igen.</p>
          </Content>
         </Repeat>
      )}
      <Repeat large>
        <Button disabled={!isValid || creating ? true : undefined} onClick={onRegister}>
          Gå med
        </Button>
      </Repeat>
    </>
  );
};

export default PersonView;
