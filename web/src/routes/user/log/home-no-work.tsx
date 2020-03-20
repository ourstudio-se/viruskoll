import React from 'react';

import useLog from './useLog';
import { LogSymptom } from '../../../@types/log';
import { Person } from '../../../@types/organization';
import { GeoLocation } from '../../../@types/location';



interface HomeNoWork {
  user: Person;
  id: string;
  type: string;
}

const HomeNoWork = ({id, type, user}: HomeNoWork) => {
  const geolocation: GeoLocation = user.locations[0].geolocation;
  const payload: LogSymptom = {
    symptoms: ['healthy',],
    workSituation: 'home-no-work',
    location: {
      geolocation,
    }
  } 

  const { statusCreate } = useLog(id, type, payload);
  console.log(statusCreate)
  return (
    <>
      <p>HomeNoWork {id}</p>
      {statusCreate.pending && <p>Registrerar resultat...</p>}
      {statusCreate.successful && <p>Resultat registrerat, tack!</p>}
      {statusCreate.failed && <p>Det gick inte att registrera resultatet...</p>}
    </>
  );
}

export default HomeNoWork;