import React from 'react';

import Repeat from '../../../components/Repeat';
import InputText from '../../../components/InputText';
import Content from '../../../components/Content';
import ManagementList from '../../../components/ManagementList';
import Snackbar from '../../../components/Snackbar';
import { Button } from '../../../components/Button';
import { Organisation, Location } from '../models';
import { payloadIsValid } from './validation';
import useOrganizationRegistration from './useOrganizationRegistration';
import SearchSuggestion from '../../../components/location/search-suggestion';
import GdprConfirm from '../../../components/gdpr/gdpr-confirm';

const init: Organisation = {
  admin: '',
  name: '',
  locations: []
}

interface OrganisationView {
  visible: boolean;
}

const OrganisationView = ({
  visible,
}: OrganisationView): JSX.Element | null => {
  const {register, creating, failed, data} = useOrganizationRegistration()
  const [organisation, setOrganisation] = React.useState(init);
  const [gdpr, setGdpr] = React.useState(false);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setOrganisation({
    ...organisation,
    [e.currentTarget.name]: e.currentTarget.value,
  }),[organisation]);

  const onRegister = React.useCallback(() => {
    register(organisation);
  }, [organisation]);

  const onAddLocation = React.useCallback((location: Location) => {
    const nextOrganisation = {...organisation };
    nextOrganisation.locations.push(location);
    setOrganisation(nextOrganisation);
  }, [organisation])

  const onGdprChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setGdpr(e.currentTarget.checked), [])

  const onRemove = React.useCallback((index: number) => {
    const nextOrganisation = {...organisation };
    nextOrganisation.locations.splice(index, 1);
    setOrganisation(nextOrganisation);
  }, []);

  const isValid = React.useMemo(() => payloadIsValid(organisation, gdpr), [organisation, gdpr]);

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
      <Repeat large>
      <Content>
        <p>När du lägger till ett företag får du en länk till din mail som du kan dela till dina kollegor så att de kan ansluta sig till gruppen. Företaget kommer få en egen översikt över hur de anställda mår. De anställda kommer givetvis anonymiseras. Ingen annan kommer att kunna lista ut länken till er företagsunika sida.</p>
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
          description="Ange den e-postadress där du vill ta emot frågorna angående ditt välmående. Den angivna e-postadressen kommer bli administratör för företaget."
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
      <GdprConfirm gdpr={gdpr} onGdprChange={onGdprChange} />
      <Repeat large>
        <Button disabled={!isValid || creating ? true : undefined} onClick={onRegister}>
          Registrera företag
        </Button>
      </Repeat>
    </>
  );
};

export default OrganisationView;
