import React from 'react';

import Page from '../../components/Page';
import Container from '../../components/Container';
import { TrackView } from '../../utils/tracking';
import GdprContent from '../../components/Gdpr/gdpr-content';

const Gdrp = () => {
  React.useEffect(() => {
    TrackView()
  }, []);
  return (
    <Page>
      <Container>
        <h1>Hantering av personuppgifter (GDPR)</h1>
        <GdprContent />
      </Container>
    </Page>
  );
}

export default Gdrp;
