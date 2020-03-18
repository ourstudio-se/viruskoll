import React from 'react';

import Page from '../../components/Page';
import Container from '../../components/Container';
import Repeat from '../../components/Repeat';
import Content from '../../components/Content';
import { H1, H2 } from '../../components/Heading';

const About = () => (
  <Page>
    <Container>
      <Repeat large>
        <Content>
          <H1>About</H1>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nam nibh. Nunc varius facilisis eros. Sed erat. In in velit quis arcu ornare laoreet. Curabitur adipiscing luctus massa.</p>
        </Content>
      </Repeat>
      <Repeat large>
        <Content>
          <H2>Hur fungerar det?</H2>
          <p>Vi skickar ut ett mail varje morgon där vi frågar dig om du mår bra eller inte, om du inte mår bra får då några superenkla frågor. Och du lägger till en eller flera platser där du vistas.</p>
          <p>Genom att göra detta kan vi förhoppningsvis hjälpa samhället att få lite översikt över situationen.</p>
          <p>Denna tjänst är gjort av personer med stor hänsyn till personlig identitet och ingen kommer kunna bli personligt knuten av användare. Och relationen med e-postadressen (som är den enda personliga identifieraren) tas bort automatiskt efter tre månader.</p>
        </Content>
      </Repeat>
    </Container>
  </Page>
);

export default About;
