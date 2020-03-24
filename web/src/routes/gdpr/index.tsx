import React from 'react';

import Page from '../../components/Page';
import Container from '../../components/Container';
import GdprContent from '../../components/Gdpr/gdpr-content';
import useTrackView from '../../hooks/useTrackView';

const Gdrp = () => {
  useTrackView();
  return (
    <Page>
      <Container>
        <h1>Hantering av personuppgifter (GDPR)</h1>
        <GdprContent />
      </Container>
    </Page>
  );
};

export default Gdrp;
