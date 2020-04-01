import React from 'react';
import Person from './person';

import Page from '../../components/Page';
import Container from '../../components/Container';
import Repeat from '../../components/Repeat';

import { H1 } from '../../components/Heading';
import useTrackView from '../../hooks/useTrackView';

const Join = (): JSX.Element => {
  useTrackView();

  return (
    <Page>
      <Container>
        <Repeat large>
          <H1 noMargin>Registrera</H1>
        </Repeat>
        <Repeat large>
          <Person visible={true} />
        </Repeat>
      </Container>
    </Page>
  );
};

export default Join;
