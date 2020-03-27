import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import NormalState from './normal-state';
import AbnormalState from './abnormal-state';
import useTrackView from '../../../hooks/useTrackView';

const NORMAL_STATE = 'normal-state';
const ABNORMAL_STATE = 'abnormal-state';

// TODO: Old log types below. To be removed short after release of the ones above.
const NO_SYMPTOM = 'no-symptom';
const WORK_FROM_HOME = 'work-from-home';
const CHILD_CARE = 'child-care';
const HOME_NO_WORK = 'home-no-work';
const HAS_SYMPTOM = 'has-symptom';
// End of old log types.

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
    case NO_SYMPTOM:
    case NORMAL_STATE:
      return <NormalState id={id} />;
    case WORK_FROM_HOME:
    case CHILD_CARE:
    case HOME_NO_WORK:
    case HAS_SYMPTOM:
    case ABNORMAL_STATE:
      return <AbnormalState id={id} />;
    default:
      return null;
  }
};

export default withRouter(Log);
