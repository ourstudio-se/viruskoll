import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import NoSymptom from './no-symptom';
import WorkFromHome from './work-from-home';
import ChildCare from './child-care';
import HomeNoWork from './home-no-work';
import HasSymptom from './has-symptom';
import useTrackView from '../../../hooks/useTrackView';

const NO_SYMPTOM = 'no-symptom';
const WORK_FROM_HOME = 'work-from-home';
const CHILD_CARE = 'child-care';
const HOME_NO_WORK = 'home-no-work';
const HAS_SYMPTOM = 'has-symptom';

interface Props {
  id: string;
  type: string;
}

type Log = RouteComponentProps<Props>;

const Log = ({ match }: Log): JSX.Element | null => {
  useTrackView();
  const { id, type } = match.params;

  if (!type) {
    return null;
  }

  switch (type.toLowerCase()) {
    case NO_SYMPTOM: return <NoSymptom id={id} />;
    case WORK_FROM_HOME: return <WorkFromHome id={id} />;
    case CHILD_CARE: return <ChildCare id={id} />;
    case HOME_NO_WORK: return <HomeNoWork id={id} />;
    case HAS_SYMPTOM: return <HasSymptom id={id} />;
    default: return null;
  }
};

export default withRouter(Log);
