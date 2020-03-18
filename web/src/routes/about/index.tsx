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
          <H1>Om Viruskoll</H1>
          <p>Coronaviruset har drabbat oss globalt och lokalt - och det innebär stora utmaningar för hela samhället. Ett avgörande problem är svårigheten att få grepp om nuläget, på grund av den snabba händelseutvecklingen.</p>
          <p>Viruskoll.se är en tjänst som ska bidra till att samhället ska få en bättre överblick av sitiuationen - en hjälpreda för små och stora institutioner, företag, organisationer, föreningar, familjer och andra communitiesen en säker och pålitlig hjälp att hantera och planera i en svår situation som vi tidigare inte stått rustade för.</p>
        </Content>
      </Repeat>
      <Repeat large>
        <Content>
          <H2>Hur fungerar det?</H2>
          <p>Varje morgon får du ett mejl från Viruskoll.se där vi ställer några enkla frågor: om du känner dig frisk eller inte?</p>
          <p>Om du är frisk får du frågan om du arbetar hemifrån eller på jobbet, pluggar eller vabbar. Känner du dig inte frisk får du istället svara på vilka symptom du upplever.</p>
          <p>Du kan även lägga till platsen du vistas på.</p>
          <p>Ju fler som använder Viruskoll.se desto större möjligheter för olika institutioner i samhället att få en översikt av situationen. Som företagare kan du till exempel dagligen överblicka läget i personalstyrkan. Denna tjänst är skapad av personer med stor hänsyn till den personliga integriteten och inidivider kommer inte att kunna blier personligt identifierade av användare. Relationen med e-postadressen (som är den enda personliga identifieraren) tas bort automatiskt efter tre månader.</p>
        </Content>
      </Repeat>
    </Container>
  </Page>
);

export default About;
