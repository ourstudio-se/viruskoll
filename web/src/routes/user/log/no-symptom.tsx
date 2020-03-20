import React from 'react';

import useLog from './useLog';
import { LogSymptom } from '../../../@types/log';
import { Person } from '../../../@types/organization';
import { GeoLocation } from '../../../@types/location';
import SuccessfulResponse from './successful-response';


interface NoSymptom {
  user: Person;
  id: string;
}

const NoSymptom = ({id, user}: NoSymptom) => {
  const geolocation: GeoLocation = user.locations[0].geolocation;
  const payload: LogSymptom = {
    symptoms: ['healthy',],
    workSituation: 'at-work',
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
      <p>No SYmptom {id}</p>
      {statusCreate.pending && <p>Registrerar resultat...</p>}
      {statusCreate.failed && <p>Det gick inte att registrera resultatet...</p>}
    </>
  );
}

export default NoSymptom;