import React from 'react';

import Repeat from '../../../components/Repeat';
import InputText from '../../../components/InputText';
import ManagementList from '../../../components/ManagementList';
import Snackbar from '../../../components/Snackbar';
import { Button } from '../../../components/Button';
import usePersonRegistration from './usePersonRegistration';
import { payloadIsValid } from './validation';
import SearchSuggestion from '../../../components/location/search-suggestion';
import GdprConfirm from '../../../components/Gdpr/gdpr-confirm';
import Content from '../../../components/Content';
import { Location } from '../../../@types/location';
import { Person } from '../../../@types/person';

const init: Person = {
  email: '',
  locations: [],
};

interface PersonView {
  visible: boolean;
}

const PersonView = ({ visible }: PersonView): JSX.Element | null => {
  const { register, statusPost } = usePersonRegistration();
  const [gdpr, setGdpr] = React.useState(false);
  const [person, setPerson] = React.useState(init);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setPerson({
        ...person,
        [e.currentTarget.name]: e.currentTarget.value,
      }),
    [person]
  );

  const onAddLocation = React.useCallback(
    (location: Location) => {
      const nextPerson = { ...person };
      nextPerson.locations.push(location);
      setPerson(nextPerson);
    },
    [person]
  );

  const onGdprChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setGdpr(e.currentTarget.checked),
    []
  );

  const onRemove = React.useCallback((index: number) => {
    const nextPerson = { ...person };
    nextPerson.locations.splice(index, 1);
    setPerson(nextPerson);
  }, []);

  const onRegister = React.useCallback(() => {
    register(person);
  }, [person]);

  const isValid = React.useMemo(() => payloadIsValid(person, gdpr), [
    person,
    gdpr,
  ]);

  if (!visible) {
    return null;
  }

  if (statusPost.successful) {
    return (
      <Snackbar severity="success" heading="Tack för din registrering!">
        <Content fullWidth>
          <p>
            Nu kommer det snart ett mail till dig så att du kan komma igång.
            Från och med då du bekräftat din e-postadress kommer du få ett mail
            varje morgon i din mailkorg där du får en enkel fråga om du är frisk
            eller inte.
          </p>
          <p>
            Om du inte känner dig frisk kommer du får svara på några fler frågor
            för att kunna kategorisera dina symptom.
          </p>
          <p>
            Flödet kommer inte ta dig mer än 30 sekunder per dag och gemensamt
            kommer vi hjälpa samhället.
          </p>
        </Content>
      </Snackbar>
    );
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
          description="Ange den e-postadress som du vill ska ta emot frågorna."
          value={person.email}
          onChange={onChange}
        />
      </Repeat>
      <Repeat large>
        <Repeat>
          <SearchSuggestion
            label="Lägg till plats"
            description="Ange de platser där du främst befinner dig, t.ex. ditt hem, arbete eller liknande."
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
      {statusPost.failed && (
        <Repeat large>
          <Snackbar severity="error" heading="Oväntat fel" icon>
            Ett oväntat fel uppstod. Vänligen försök igen.
          </Snackbar>
        </Repeat>
      )}
      <GdprConfirm gdpr={gdpr} onGdprChange={onGdprChange} />
      <Repeat large>
        <Button
          disabled={!isValid || statusPost.pending ? true : undefined}
          onClick={onRegister}
        >
          Registrera
        </Button>
      </Repeat>
    </>
  );
};

export default PersonView;
