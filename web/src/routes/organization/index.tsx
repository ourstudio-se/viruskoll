import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useOrganization from './useOrganization';
import { TrackView } from '../../utils/tracking';
import VirusDashboard from '../../components/Virus/virus-dashboard';

//rScU83AB-g_LsmQ4cYzy

interface Props {
  id?: string;
}

type Organization = RouteComponentProps<Props>

const Organization = ({ match }: Organization): JSX.Element => {
  React.useEffect(() => {
    TrackView()
  }, []);
  const { id } = match.params;
  const { organization } = useOrganization(id)

  return <VirusDashboard organization={organization} organizationId={id} />;
}

export default withRouter(Organization);
