import React from 'react';
import NoSymptom from './no-symptom';
import WorkFromHome from './work-from-home';
import ChildCare from './child-care';
import HomeNoWork from './home-no-work';
import HasSymptom from './has-symptom';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useUser from './useUser';

const NO_SYMPTOM = 'no-symptom';
const WORK_FROM_HOME = 'work-from-home';
const CHILD_CARE = 'child-care';
const HOME_NO_WORK = 'home-no-work';
const HAS_SYMPTOM = 'has-symptom';

interface Props {
  id: string;
  type: string;
}

type Log = RouteComponentProps<Props>

const Log = ({match}: Log): JSX.Element | null => {
  const { id, type } = match.params
  const {user, statusGet} = useUser(id);
  
  if (!type) {
    return null;
  }

  if (statusGet.pending) {
    return <p>Laddar...</p>
  }

  if (statusGet.failed) {
    return <p>Gick inte att hämta användaren</p>
  }

  if (statusGet.successful && user) {
    switch (type.toLowerCase()) {
      case NO_SYMPTOM: return <NoSymptom id={id} type={type} user={user} />
      case WORK_FROM_HOME: return <WorkFromHome id={id} type={type} user={user} />
      case CHILD_CARE: return <ChildCare id={id} type={type} user={user} />
      case HOME_NO_WORK: return <HomeNoWork id={id} type={type} user={user} />
      case HAS_SYMPTOM: return <HasSymptom id={id} type={type} user={user} />
      default: return null;
    }
  }
  return null;
}

export default withRouter(Log);