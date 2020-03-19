import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Page from '../../../components/Page';
import Container from '../../../components/Container';
import Repeat from '../../../components/Repeat';
import Content from '../../../components/Content';
import Loader from '../../../components/Loader';
import Link from '../../../components/Link';
import Snackbar from '../../../components/Snackbar';
import { H1 } from '../../../components/Heading';

import { TrackView } from '../../../utils/tracking';
import useUserVerify from './useUserVerify';

interface Props {
  id?: string;
}

type UserVerify = RouteComponentProps<Props>

const UserVerify = ({ match }: UserVerify): JSX.Element => {
  const { id } = match.params;
  const { creating ,successCreate, failedCreate } = useUserVerify(id)
  React.useEffect(() => {
    TrackView()
  }, []);

  if (successCreate) {
    return (
      <Page>
        <Container textCenter>
          <Repeat large>
            <Content center>
              <H1>Din e-postadress är nu bekräftad</H1>
              <p>Välkommen till Viruskoll! Snart kommer du få den första frågan skickad till din e-postadress. Sedan kommer samma fråga dyka upp dagligen. Ditt svar bidrar till ett bättre underlag för Viruskoll.se.</p>
            </Content>
          </Repeat>
          <Repeat large>
            <Link to="/">Gå till startsidan</Link>
          </Repeat>
        </Container>
      </Page>
    );
  }

  if (failedCreate) {
    return (
      <Page>
        <Container textCenter>
          <Repeat large>
            <Snackbar
              severity="error"
              heading="Något gick fel..."
              icon={true}
            >
              Din e-postadress kunde inte bekräftas. Vänligen försök igen.
            </Snackbar>
          </Repeat>
          <Repeat large>
            <Link to="/">Gå till startsidan</Link>
          </Repeat>
        </Container>
      </Page>
    );
  }

  if (creating) {
    return (
      <Page>
        <Container>
          <Loader />
        </Container>
      </Page>
    );
  }

  return null;
}

export default withRouter(UserVerify);
