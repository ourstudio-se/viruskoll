import React from 'react';

import Repeat from '../../../components/Repeat';
import InputText from '../../../components/InputText';
import Content from '../../../components/Content';
import ManagementList from '../../../components/ManagementList';
import Snackbar from '../../../components/Snackbar';
import { Button } from '../../../components/Button';
import { Organization } from '../../../@types/organization';
import { payloadIsValid } from './validation';
import useOrganizationRegistration from './useOrganizationRegistration';
import SearchSuggestion from '../../../components/location/search-suggestion';
import GdprConfirm from '../../../components/Gdpr/gdpr-confirm';
import { Location } from '../../../@types/location';

const init: Organization = {
  admin: '',
  name: '',
  locations: [],
};

interface OrganisationView {
  visible: boolean;
}

const OrganisationView = ({
  visible,
}: OrganisationView): JSX.Element | null => {
  const { register, statusPost } = useOrganizationRegistration();
  const [organisation, setOrganisation] = React.useState(init);
  const [gdpr, setGdpr] = React.useState(false);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setOrganisation({
        ...organisation,
        [e.currentTarget.name]: e.currentTarget.value,
      }),
    [organisation]
  );

  const onRegister = React.useCallback(() => {
    register(organisation);
  }, [organisation]);

  const onAddLocation = React.useCallback(
    (location: Location) => {
      const nextOrganisation = { ...organisation };
      nextOrganisation.locations.push(location);
      setOrganisation(nextOrganisation);
    },
    [organisation]
  );

  const onGdprChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setGdpr(e.currentTarget.checked),
    []
  );

  const onRemove = React.useCallback((index: number) => {
    const nextOrganisation = { ...organisation };
    nextOrganisation.locations.splice(index, 1);
    setOrganisation(nextOrganisation);
  }, []);

  const isValid = React.useMemo(() => payloadIsValid(organisation, gdpr), [
    organisation,
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
      <Repeat large>
        <Content>
          <p>
            När du lägger till ett företag får du en länk till din mail som du
            kan dela till dina kollegor så att de kan ansluta sig till gruppen.
            Företaget kommer få en egen översikt över hur de anställda mår. De
            anställda kommer givetvis anonymiseras. Ingen annan kommer att kunna
            lista ut länken till er företagsunika sida.
          </p>
        </Content>
      </Repeat>
      <Repeat>
        <InputText
          label="Företagets namn"
          placeholder="Företagets namn"
          id="join-org-name"
          name="name"
          value={organisation.name}
          onChange={onChange}
        />
      </Repeat>
      <Repeat>
        <InputText
          label="Din e-postadress"
          placeholder="example@email.com"
          id="join-org-email"
          name="admin"
          autocomplete="email"
          description="Ange den e-postadress som du vill ska ta emot frågorna. Den angivna e-postadressen kommer bli administratör för företaget."
          value={organisation.admin}
          onChange={onChange}
        />
      </Repeat>
      <Repeat large>
        <Repeat>
          <SearchSuggestion
            onAddLocation={onAddLocation}
            label="Lägg till kontor"
            description="Ange kontorets adress."
            action="Lägg till"
            placeholder="Sök plats..."
          />
        </Repeat>
        {organisation.locations && organisation.locations.length > 0 && (
          <Repeat>
            <ManagementList
              locations={organisation.locations}
              onRemove={onRemove}
            />
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
          Registrera företag
        </Button>
      </Repeat>
    </>
  );
};

export default OrganisationView;
