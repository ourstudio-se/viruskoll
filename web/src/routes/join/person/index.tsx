import React from 'react';

import Repeat from '../../../components/Repeat';
import InputText from '../../../components/InputText';
import InputCheckbox from '../../../components/InputCheckbox';
import OverflowBox from '../../../components/OverflowBox';
import Content from '../../../components/Content';
import ManagementList from '../../../components/ManagementList';
import Snackbar from '../../../components/Snackbar';
import { Button, ButtonInline } from '../../../components/Button';
import LocationSearch from '../../../components/location/search';

import { Person, Location } from '../models';
import usePersonRegistration from './usePersonRegistration';
import { payloadIsValid } from './validation';
import SearchSuggestion from '../../../components/location/search-suggestion';

const init: Person = {
  birthYear: 0,
  email: '',
  emailVerified: false,
  organizations: [],
  locations: []
}

interface PersonView {
  visible: boolean;
}

const PersonView = ({
  visible,
}: PersonView): JSX.Element | null => {
  const {register, creating, failed, data} = usePersonRegistration()
  const [gdpr, setGdpr] = React.useState(false);
  const [person, setPerson] = React.useState(init);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPerson({
    ...person,
    [e.currentTarget.name]: e.currentTarget.value,
  }),[person]);

  const onAddLocation = React.useCallback((location: Location) => {
    const nextPerson = {...person };
    nextPerson.locations.push(location);
    setPerson(nextPerson);
  }, [person])

  const onGdprChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setGdpr(e.currentTarget.checked), [])

  const onRemove = React.useCallback((index: number) => {
    const nextPerson = {...person };
    nextPerson.locations.splice(index, 1);
    setPerson(nextPerson);
  }, []);

  const onRegister = React.useCallback(() => {
    register(person);
  }, [person]);

  const isValid = React.useMemo(() => payloadIsValid(person, gdpr), [person, gdpr]);

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
      <Repeat large>
        <Repeat>
          <SearchSuggestion
            label="Lägg till plats"
            description="Ange den plats där du oftast befinner dig, såsom ditt hem."
            action="Lägg till"
            onAddLocation={onAddLocation}
            placeholder="Sök plats..."
          />
        </Repeat>
        {person.locations && person.locations.length > 0 && (
          <Repeat>
            <ManagementList locations={person.locations} onRemove={onRemove} />
          </Repeat>
        )}
      </Repeat>
      {failed && (
        <Repeat large>
          <Snackbar
            severity="error"
            heading="Oväntat fel"
          >
            Ett oväntat fel uppstod. Vänligen försök igen.
          </Snackbar>
        </Repeat>
      )}
      <Repeat large>
        <Repeat>
          <InputCheckbox
            id="join-person-gdpr"
            checked={gdpr}
            onChange={onGdprChange}
          >
            <span>Jag godkänner att Viruskoll lagrar och använder mina uppgifter.</span> <ButtonInline>Läs hur Viruskoll hanterar dina uppgifter här</ButtonInline>.
          </InputCheckbox>
        </Repeat>
        <Repeat>
          <OverflowBox>
            <Content fullWidth>
              <h3>Hantering av personuppgifter</h3>
              <p>Viruskoll.se sparar din e-postadress så länge du fortsätter använda tjänsten och raderas automatiskt efter tre månader. Vi sparar ingen annan information som går att binda till dig och när du avslutar tjänsten så raderas all data. Vi delar inte med oss av någon data som kan knytas till dig som person eller organisation. Vi visar heller aldrig data när det finns risk att det går att knyta en enskild person till resultatet.</p>
            </Content>
          </OverflowBox>
        </Repeat>
      </Repeat>
      <Repeat large>
        <Button disabled={!isValid || creating ? true : undefined} onClick={onRegister}>
          Gå med
        </Button>
      </Repeat>
    </>
  );
};

export default PersonView;
