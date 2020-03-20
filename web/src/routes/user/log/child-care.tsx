import React from 'react';

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
  console.log(statusCreate)

  if (statusCreate.successful) {
    return (
      <SuccessfulResponse />
    )
  }


  return (
    <>
      <p>Child care {id}</p>
      {statusCreate.pending && <p>Registrerar resultat...</p>}
      {statusCreate.failed && <p>Det gick inte att registrera resultatet...</p>}
    </>
  );
}

export default ChildCare;