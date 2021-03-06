import React from 'react';

import Page from '../../../components/Page';
import Loader from '../../../components/Loader';
import Snackbar from '../../../components/Snackbar';
import Link from '../../../components/Link';
import Container from '../../../components/Container';

import useLog from './useLog';
import { LogSymptom } from '../../../@types/log';
import SuccessfulResponse from './successful-response';

interface NoSymptom {
  id: string;
}

const NoSymptom = ({ id }: NoSymptom) => {
  const payload: LogSymptom = {
    symptoms: ['healthy'],
    dailySituation: 'as-usual',
  };

  const { statusCreate } = useLog(id, payload);

  if (statusCreate.successful) {
    return <SuccessfulResponse />;
  }

  return (
    <Page>
      <Container>
        {statusCreate.pending && <Loader />}
        {statusCreate.failed && (
          <Snackbar severity="error" heading="Något gick fel..." icon>
            <>
              Det gick inte att registrera resultatet. Vänligen försök igen.{' '}
              <Link to="/">Gå till startsidan</Link>
            </>
          </Snackbar>
        )}
      </Container>
    </Page>
  );
};

export default NoSymptom;
