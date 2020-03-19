import React from 'react';
import Person from './person';
import Organisation from './organisation';

import Page from '../../components/Page';
import Container from '../../components/Container';
import Repeat from '../../components/Repeat';
import Content from '../../components/Content';
import ToggleTabs from '../../components/ToggleTabs';
import { H1 } from '../../components/Heading';
import { TrackView } from '../../utils/tracking';

const Join = (): JSX.Element => {
  const [tab, setTab] = React.useState(0);
  React.useEffect(() => {
    TrackView()
  }, []);
  const onTabChange = React.useCallback((nextTab) => setTab(nextTab), [tab]);
  return (
    <Page>
      <Container>
        <Repeat large>
          <Content>
            <H1>Registrera</H1>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam nibh. Nunc varius facilisis eros. Sed erat. In in velit quis arcu ornare laoreet. Curabitur adipiscing luctus massa.</p>
          </Content>
        </Repeat>
        <Repeat large>
          <ToggleTabs currentTab={tab} onTabChange={onTabChange} />
        </Repeat>
        <Repeat large>
          <Person visible={tab === 0} />
          <Organisation visible={tab === 1} />
        </Repeat>
      </Container>
    </Page>
  );
};

export default Join;
