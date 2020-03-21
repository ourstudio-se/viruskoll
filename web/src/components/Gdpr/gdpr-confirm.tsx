import React from 'react';
import Repeat from '../Repeat';
import InputCheckbox from '../InputCheckbox';
import { ButtonInline } from '../Button';
import GdprModal from './gdpr-modal';

interface GdprConfirm {
  gdpr: boolean;
  onGdprChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GdprConfirm = ({gdpr, onGdprChange}: GdprConfirm): JSX.Element => {
  const [displayGdpr, setDisplayGdrp] = React.useState(false);
  const onDisplayGdpr = React.useCallback(() => setDisplayGdrp(true), []);
  const onHideGdpr = React.useCallback(() => setDisplayGdrp(false), []);
  return (
    <Repeat large>
      <Repeat>
        <InputCheckbox
          id="join-person-gdpr"
          checked={gdpr}
          onChange={onGdprChange}
        >
          <div>
            Jag godkänner att Viruskoll lagrar och använder mina personuppgifter. <ButtonInline onClick={onDisplayGdpr}>Läs hur Viruskoll hanterar dina uppgifter här</ButtonInline>.
          </div>
        </InputCheckbox>
      </Repeat>
      {displayGdpr && <GdprModal onClose={onHideGdpr} />}
    </Repeat>
  )
}

export default GdprConfirm;
