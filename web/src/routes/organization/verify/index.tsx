import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { TrackView } from '../../../utils/tracking';
import useOrganizationVerify from './useOrganizationVerify';

interface Props {
  id?: string;
}

type UserVerify = RouteComponentProps<Props>

const UserVerify = ({ match }: UserVerify): JSX.Element => {
  const { id } = match.params;
  const { creating ,successCreate, failedCreate } = useOrganizationVerify(id)
  React.useEffect(() => {
    TrackView()
  }, []);
  
  if (successCreate) {
    return <p>Verifiering lyckades</p>
  }

  if (failedCreate) {
    return <p>Verifiering misslyckades</p>
  }

  if (creating) {
    return <p>Verifierar...</p>
  }

  return null;
}

export default withRouter(UserVerify);
