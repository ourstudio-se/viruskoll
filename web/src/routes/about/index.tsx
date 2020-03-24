import React from 'react';

import Page from '../../components/Page';
import Container from '../../components/Container';
import Repeat from '../../components/Repeat';
import Content from '../../components/Content';
import LinkExternal from '../../components/LinkExternal';
import { H1, H2 } from '../../components/Heading';
import { TrackView } from '../../utils/tracking';

const About = () => {
  React.useEffect(() => {
    TrackView();
  }, []);
  return (
    <Page>
      <Container>
        <Repeat large>
          <Content>
            <H1>Om Viruskoll</H1>
            <p>Viruskoll.se är en tjänst som ska bidra till att samhället ska få en bättre överblick av situationen – ett hjälpverktyg för stora som små institutioner, företag, organisationer, föreningar, familjer, etc. att hantera och planera i en svår situation som vi tidigare inte stått rustade för.</p>
          </Content>
        </Repeat>
        <Repeat large>
          <Content>
            <H2>Hur fungerar det?</H2>
            <p>Varje morgon får du ett mejl från Viruskoll.se med några enkla frågor, bland annat om hur frisk du känner dig, eventuella symptom och om du arbetar/pluggar hemifrån eller ej. Du kan lägga till platser du främst vistas på och se data över dessa områden.</p>
            <p>Ju fler som använder Viruskoll.se, desto större möjlighet för olika institutioner i samhället att få en översikt av situationen. Som företagare kan du till exempel dagligen överblicka läget i personalstyrkan. Denna tjänst tar stor hänsyn till den personliga integriteten och individer kommer inte att kunna bli personligt identifierade av användare. Din e-postadress kommer automatiskt tas bort efter tre månader och lagringen av data är enhetligt med GDPR.</p>
          </Content>
        </Repeat>
        <Repeat large>
          <Content>
            <H2>Vilka ligger bakom Viruskoll.se?</H2>
            <p>Vi heter <LinkExternal href="https://ourstudio.se/" title="Our Studio" target="_blank" rel="noopener">Our Studio</LinkExternal>. Vi hjälper Wayke, Intersport, Mio, Volvo Cars och Volvo Penta med deras digitala utmaningar. Totalt är vi 25 personer i Göteborg. Viruskoll.se har byggts för att hjälpa oss själva och samhället i situationen som råder och vi hoppas att du som använder tjänsten känner att vi tar din personliga integritet på allvar. Vi kommer absolut inte dela eller sälja någon data. Inga annonser visas på sidan, utan vi står för alla kostnader själva.</p>
          </Content>
        </Repeat>
      </Container>
    </Page>
  );
};

export default About;
