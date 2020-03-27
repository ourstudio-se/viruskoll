import React from 'react';

import Page from '../../../components/Page';
import Container from '../../../components/Container';
import Content from '../../../components/Content';
import Repeat from '../../../components/Repeat';
import Link from '../../../components/Link';
import { H1 } from '../../../components/Heading';

const SuccessfulResponse = () => (
  <Page>
    <Container textCenter>
      <Repeat large>
        <Content center>
          <H1>Tack för ditt svar!</H1>
          <p>
            Tack för att du tog din tid till att hjälpa oss och många andra att
            göra samhället en tjänst.
          </p>
        </Content>
      </Repeat>
      <Repeat large>
        <Link to="/">Gå till startsidan</Link>
      </Repeat>
    </Container>
  </Page>
);

export default SuccessfulResponse;
