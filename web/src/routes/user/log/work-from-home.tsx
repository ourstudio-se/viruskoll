import React from 'react';

import useLog from './useLog';
import { LogSymptom } from '../../../@types/log';
import { Person } from '../../../@types/organization';
import { GeoLocation } from '../../../@types/location';


interface WorkFromHome {
  user: Person;
  id: string;
  type: string;
}

const WorkFromHome = ({id, type, user}: WorkFromHome) => {
  const geolocation: GeoLocation = user.locations[0].geolocation;
  const payload: LogSymptom = {
    symptoms: ['healthy',],
    workSituation: 'work-from-home',
    location: {
      geolocation,
    }
  } 

  const { statusCreate } = useLog(id, type, payload);
  console.log(statusCreate)
  return (
    <>
      <p>Work from home {id}</p>
      {statusCreate.pending && <p>Registrerar resultat...</p>}
      {statusCreate.successful && <p>Resultat registrerat, tack!</p>}
      {statusCreate.failed && <p>Det gick inte att registrera resultatet...</p>}
    </>
  );
}

export default WorkFromHome;