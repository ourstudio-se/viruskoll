import React from 'react';

import useLog from './useLog';
import { LogSymptom } from '../../../@types/log';
import { Person } from '../../../@types/organization';
import { GeoLocation } from '../../../@types/location';

interface ChildCare {
  user: Person;
  id: string;
  type: string;
}

const ChildCare = ({id, type, user}: ChildCare) => {
  const geolocation: GeoLocation = user.locations[0].geolocation;
  const payload: LogSymptom = {
    symptoms: ['healthy',],
    workSituation: 'child-care',
    location: {
      geolocation,
    }
  } 

  const { statusCreate } = useLog(id, type, payload);
  console.log(statusCreate)
  return (
    <>
      <p>Child care {id}</p>
      {statusCreate.pending && <p>Registrerar resultat...</p>}
      {statusCreate.successful && <p>Resultat registrerat, tack!</p>}
      {statusCreate.failed && <p>Det gick inte att registrera resultatet...</p>}
    </>
  );
}

export default ChildCare;