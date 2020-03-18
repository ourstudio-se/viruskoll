import React from 'react';

import Repeat from '../../../components/Repeat';
import InputText from '../../../components/InputText';
import Content from '../../../components/Content';
import { Button } from '../../../components/Button';

interface Organisation {
  visible: boolean;
}

const Organisation = ({
  visible,
}: Organisation): JSX.Element | visible => {
  if (!visible) {
    return null;
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
          name="business-name"
        />
      </Repeat>
      <Repeat>
        <InputText
          label="Din E-postadress (blir admin)"
          placeholder="example@email.com"
          id="join-org-email"
          name="email"
          autocomplete="email"
          description="Ange den e-postadress där du vill ta emot frågorna angående ditt välmående. Den angivna e-postadressen kommer bli administratör för företaget."
        />
      </Repeat>
      <Repeat large>
        <Button>
          Registrera företag
        </Button>
      </Repeat>
    </>
  );
};

export default Organisation;
