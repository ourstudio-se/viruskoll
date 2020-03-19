import React from 'react';
import Repeat from '../Repeat';
import InputCheckbox from '../InputCheckbox';
import OverflowBox from '../OverflowBox';
import Content from '../Content';
import { ButtonInline } from '../Button';


interface GdprConfirm {
  gdpr: boolean;
  onGdprChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GdprConfirm = ({gdpr, onGdprChange}: GdprConfirm): JSX.Element => {
  const [displayGdpr, setDisplayGdrp] = React.useState(false);
  const onDisplayGdpr = React.useCallback(() => setDisplayGdrp(true), []);
  return (
    <Repeat large>
      <Repeat>
        <InputCheckbox
          id="join-person-gdpr"
          checked={gdpr}
          onChange={onGdprChange}
        >
          <span>Jag godkänner att Viruskoll lagrar och använder mina uppgifter.</span> <ButtonInline onClick={onDisplayGdpr}>Läs hur Viruskoll hanterar dina uppgifter här</ButtonInline>.
        </InputCheckbox>
      </Repeat>
      {displayGdpr && (
        <Repeat>
          <OverflowBox>
            <Content fullWidth>
              <h3>Hantering av personuppgifter</h3>
              <p>Viruskoll.se sparar din e-postadress så länge du fortsätter använda tjänsten och raderas automatiskt efter tre månader. Vi sparar ingen annan information som går att binda till dig och när du avslutar tjänsten så raderas all data. Vi delar inte med oss av någon data som kan knytas till dig som person eller organisation. Vi visar heller aldrig data när det finns risk att det går att knyta en enskild person till resultatet.</p>
            </Content>
          </OverflowBox>
        </Repeat>
      )}
    </Repeat>
  )
}

export default GdprConfirm;
