import React from 'react';

import useLog from './useLog';
import { LogSymptom } from '../../../@types/log';
import { Person } from '../../../@types/organization';
import { GeoLocation } from '../../../@types/location';
import SuccessfulResponse from './successful-response';



interface HomeNoWork {
  user: Person;
  id: string;
}

const HomeNoWork = ({id, user}: HomeNoWork) => {
  const geolocation: GeoLocation = user.locations[0].geolocation;
  const payload: LogSymptom = {
    symptoms: ['healthy',],
    workSituation: 'home-no-work',
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
    <>
      <p>HomeNoWork {id}</p>
      {statusCreate.pending && <p>Registrerar resultat...</p>}
      {statusCreate.failed && <p>Det gick inte att registrera resultatet...</p>}
    </>
  );
}

export default HomeNoWork;