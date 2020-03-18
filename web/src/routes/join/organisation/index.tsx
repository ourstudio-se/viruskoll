import React from 'react';

import Repeat from '../../../components/Repeat';
import InputText from '../../../components/InputText';
import Content from '../../../components/Content';
import ManagementList from '../../../components/ManagementList';
import { Button } from '../../../components/Button';
import { Organisation } from '../models';
import { payloadIsValid } from './validation';
import useOrganizationRegistration from './useOrganizationRegistration';

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

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setOrganisation({
    ...organisation,
    [e.currentTarget.name]: e.currentTarget.value,
  }),[organisation]);

  const onRegister = React.useCallback(() => {
    register(organisation);
  }, [organisation]);

  const isValid = React.useMemo(() => payloadIsValid(organisation), [organisation]);

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
        <p>När du lägger till ett företag får du en länk till din mail som du kan dela till dina kollegor så att de kan ansluta sig till gruppen. På denna sida får du även översikt över hur era anställda mår. Självklart utan att avslöja vem som är vem.</p>
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
      <Repeat>
        <InputText
          label="Lägg till kontor"
          placeholder="Sök plats..."
          id="join-org-location"
          name="location"
          description="Ange kontorets adress."
          action="Lägg till"
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
          Registrera företag
        </Button>
      </Repeat>
    </>
  );
};

export default OrganisationView;
