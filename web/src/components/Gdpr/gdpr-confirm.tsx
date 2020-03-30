import React from 'react';
import Repeat from '../Repeat';
import InputCheckbox from '../InputCheckbox';
import { ButtonInline } from '../Button';
import GdprModal from './gdpr-modal';

interface GdprConfirm {
  gdpr: boolean;
  onGdprChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GdprConfirm = ({ gdpr, onGdprChange }: GdprConfirm): JSX.Element => {
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
            Jag samtycker till att Viruskoll behandlar min e-post adress, den grupp jag valt att tillhöra och de loggar jag delar med mig av kring min arbetssituation och mina symptom för att kunna sammanställa och i anonymiserat skick visa ett underlag på många människors situation för allmänheten på viruskoll.se.{' '}
            <ButtonInline onClick={onDisplayGdpr}>
              Läs mer om hur Viruskoll hanterar dina personuppgifter här
            </ButtonInline>
            .
          </div>
        </InputCheckbox>
      </Repeat>
      {displayGdpr && <GdprModal onClose={onHideGdpr} />}
    </Repeat>
  );
};

export default GdprConfirm;
