import React from 'react';
import Person from './person';
import Organisation from './organisation';

import Page from '../../components/Page';
import Container from '../../components/Container';
import Repeat from '../../components/Repeat';
//import ToggleTabs from '../../components/ToggleTabs';
import { H1 } from '../../components/Heading';
import useTrackView from '../../hooks/useTrackView';

const Join = (): JSX.Element => {
  useTrackView();
  /*
  const [tab, setTab] = React.useState(0);
  const onTabChange = React.useCallback((nextTab) => setTab(nextTab), [tab]);
  */
  return (
    <Page>
      <Container>
        <Repeat large>
          <H1 noMargin>Registrera</H1>
        </Repeat>
        {/*
        <Repeat large>
          <ToggleTabs currentTab={tab} onTabChange={onTabChange} />
        </Repeat>
        */}
        <Repeat large>
          <Person visible={true} />
          <Organisation visible={false} />
        </Repeat>
      </Container>
    </Page>
  );
};

export default Join;
