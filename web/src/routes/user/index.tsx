import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Page from '../../components/Page';
import Container from '../../components/Container';
import Content from '../../components/Content';
import Repeat from '../../components/Repeat';
import ToggleTabs from '../../components/ToggleTabs';
import { Button } from '../../components/Button';
import { H1, H2 } from '../../components/Heading';
import { TextLight } from '../../components/TextDecoration';
import { TrackView } from '../../utils/tracking';

interface Props {
  id?: string;
}

type User = RouteComponentProps<Props>

const User = ({ match }: User): JSX.Element => {
  React.useEffect(() => {
    TrackView()
  }, []);
  const { id } = match.params;
  //const {} = useUser(id)
  console.log(id);

  return (
    <Page>
      <Container textCenter>
        <Repeat large>
          <Content center>
            <H1>Fördjupande frågor</H1>
            <p>Du har svarat att du inte mår helt bra. Här kommer lite fördjupande frågor.</p>
          </Content>
        </Repeat>
        <Repeat large>
          <Repeat large>
            <H2>Har du feber?</H2>
            <ToggleTabs />
          </Repeat>
          <Repeat large>
            <H2>Har du torrhosta?</H2>
            <ToggleTabs />
          </Repeat>
          <Repeat large>
            <H2>Är du förkyld?</H2>
            <ToggleTabs />
          </Repeat>
          <Repeat large>
            <H2>Jobbar/studerar du?</H2>
            <ToggleTabs />
          </Repeat>
          <Repeat large>
            <H2>Jobbar/studerar du hemifrån?</H2>
            <ToggleTabs />
          </Repeat>
          <Repeat large>
            <H2>Tar du hand om sjuka barn?</H2>
            <ToggleTabs />
          </Repeat>
        </Repeat>
        <Repeat large>
          <Repeat>
            <Button>
              Skicka in svar
            </Button>
          </Repeat>
          <Repeat>
            <TextLight>
              <Content center>
                <p>Dina svar förblir helt anonyma och går inte knyta till en enskild individ.</p>
              </Content>
            </TextLight>
          </Repeat>
        </Repeat>
      </Container>

      <Container textCenter>
        <Repeat large>
          <Content center>
            <H1>Tack för dina svar!</H1>
            <p>Tack för att du tog din tid till att hjälpa oss och många andra att göra samhället en tjänst.</p>
          </Content>
        </Repeat>
        <Repeat large>
          <Button outline>
            Gå till startsidan
          </Button>
        </Repeat>
      </Container>
      
    </Page>
  );
}

export default withRouter(User);
