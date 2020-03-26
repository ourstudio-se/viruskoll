import * as React from 'react';

import Page from '../../components/Page';
import Container from '../../components/Container';
import Content from '../../components/Content';
import Link from '../../components/Link';
import Snackbar from '../../components/Snackbar';
import { H1 } from '../../components/Heading';
import Repeat from '../../components/Repeat';

const NotFound = () => (
  <>
    <Page>
      <Container>
        <Repeat large>
          <Content>
            <H1>Något har blivit fel...</H1>
            <p>
              Sidan du söker kunde inte hittas. Använd navigeringen i toppen av
              sidan för att ta dig vidare eller <Link to='/'>klicka här</Link>{' '}
              för att komma till startsidan.
            </p>
          </Content>
        </Repeat>
        <Repeat large>
          <Snackbar severity='error' heading='Error 404' icon>
            Sidan du söker kunde inte hittas.
          </Snackbar>
        </Repeat>
      </Container>
    </Page>
  </>
);

export default NotFound;
