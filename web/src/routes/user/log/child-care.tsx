import React from 'react';

import Page from '../../../components/Page';
import Loader from '../../../components/Loader';
import Snackbar from '../../../components/Snackbar';
import Link from '../../../components/Link';
import Container from '../../../components/Container';

import useLog from './useLog';
import { LogSymptom } from '../../../@types/log';
import { Person } from '../../../@types/organization';
import { GeoLocation } from '../../../@types/location';
import SuccessfulResponse from './successful-response';

interface ChildCare {
  user: Person;
  id: string;
}

const ChildCare = ({id, user}: ChildCare) => {
  const geolocation: GeoLocation = user.locations[0].geolocation;
  const payload: LogSymptom = {
    symptoms: ['healthy',],
    workSituation: 'child-care',
    location: {
      geolocation,
    }
  }

  const { statusCreate } = useLog(id, payload);

  if (statusCreate.successful) {
    return (
      <SuccessfulResponse />
    )
  }

  return (
    <Page>
      <Container>
        {statusCreate.pending && (
          <Loader />
        )}
        {statusCreate.failed && (
          <Snackbar
            severity="error"
            heading="Något gick fel..."
            icon={true}
          >
            <>
              Det gick inte att registrera resultatet. Vänligen försök igen. <Link to="/">Gå till startsidan</Link>
            </>
          </Snackbar>
        )}
      </Container>
    </Page>
  );
}

export default ChildCare;
