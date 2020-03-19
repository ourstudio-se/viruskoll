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
  const [search, setSearch] = React.useState('');
  const [person, setPerson] = React.useState(init);

  const onSearch = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.currentTarget.value), []);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPerson({
    ...person,
    [e.currentTarget.name]: e.currentTarget.value,
  }),[person]);

  const onAddLocation = React.useCallback((location: Location) => {
    const nextPerson = {...person };
    nextPerson.locations.push(location);
    setPerson(nextPerson);
  }, [person])

  const onRemove = React.useCallback((index: number) => {
    const nextPerson = {...person };
    nextPerson.locations.splice(index, 1);
    setPerson(nextPerson);
  }, []);

  const onRegister = React.useCallback(() => {
    register(person);
  }, [person]);

  const isValid = React.useMemo(() => payloadIsValid(person), [person]);

  if (!visible) {
    return null;
  }

  if (data) {
    return (
      <Snackbar
        severity="success"
        heading="Tack för din registrering!"
      >
        <Content fullWidth>
          <p>Nu kommer det snart ett mail till dig så att du kan komma igång. Från och med då du bekräftat din e-postadress kommer du få ett mail varje morgon i din mailkorg där du får en enkel fråga om du är frisk eller inte.</p>
          <p>In dy ubte jöbber dug frisk kommer du får svara på några fler frågor för att kunna kategorisera dina symptom.</p>
          <p>Flödet kommer inte ta dig mer än 30 sekunder per dag och gemensamt kommer vi hjälpa samhället.</p>
        </Content>
      </Snackbar>
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
            description="Ange den plats där du oftast befinner dig, såsom ditt hem. Du kan lägga till flera platser."
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
      <Repeat large>
        <Repeat>
          <InputCheckbox
            id="join-person-gdpr"
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
      {failed && (
        <Repeat large>
          <Snackbar
            severity="error"
            heading="Oväntat fel"
            icon
          >
            Ett oväntat fel uppstod. Vänligen försök igen.
          </Snackbar>
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
