import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Page from '../../components/Page';
import Container from '../../components/Container';
import Link from '../../components/Link';
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
        <Link to="/">Gå till startsidan</Link>
      </Container>
    </Page>
  );
}

export default withRouter(User);
