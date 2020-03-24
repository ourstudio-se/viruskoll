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
import useOrganizationVerify from './useOrganizationVerify';

interface Props {
  id?: string;
}

type UserVerify = RouteComponentProps<Props>;

const UserVerify = ({ match }: UserVerify): JSX.Element => {
  const { id } = match.params;
  const { statusCreate } = useOrganizationVerify(id);
  React.useEffect(() => {
    TrackView();
  }, []);

  if (statusCreate.successful) {
    return (
      <Page>
        <Container textCenter>
          <Repeat large>
            <Content center>
              <H1>Din e-postadress är nu bekräftad</H1>
              <p>Välkommen till Viruskoll.se! Snart kommer du få information om hur du når företagets sida, samt den första frågan skickad till din e-postadress. Sedan kommer samma fråga dyka upp dagligen. Ditt svar bidrar till ett bättre underlag för Viruskoll.se.</p>
            </Content>
          </Repeat>
          <Repeat large>
            <Link to="/">Gå till startsidan</Link>
          </Repeat>
        </Container>
      </Page>
    );
  }

  if (statusCreate.failed) {
    return (
      <Page>
        <Container>
          <Snackbar
            severity="error"
            heading="Något gick fel..."
            icon
          >
            <>
              Din e-postadress kunde inte bekräftas. Vänligen försök igen. <Link to="/">Gå till startsidan</Link>
            </>
          </Snackbar>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container>
        <Loader />
      </Container>
    </Page>
  );
};

export default withRouter(UserVerify);
