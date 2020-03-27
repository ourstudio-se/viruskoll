import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import useOrganization from './useOrganization';
import VirusDashboard from '../../components/Virus/virus-dashboard';
import SettingsModal from './settings-modal';
import { Organization } from '../../@types/organization';
import JoinOrganizationModal from './join-organization-modal';
import useTrackView from '../../hooks/useTrackView';

interface Props {
  id?: string;
}

type OrganizationComponent = RouteComponentProps<Props>;

const OrganizationComponent = ({
  match,
}: OrganizationComponent): JSX.Element => {
  useTrackView();
  const [settings, setSettings] = React.useState(false);
  const [register, setRegister] = React.useState(false);
  const onShowSettings = React.useCallback(() => setSettings(true), []);
  const onCloseSettings = React.useCallback(() => setSettings(false), []);

  const onShowRegisterModal = React.useCallback(() => setRegister(true), []);
  const onCloseRegisterModal = React.useCallback(() => setRegister(false), []);

  const { id } = match.params;
  const { organization, update, statusUpdate, setUpdate } = useOrganization(id);

  const onUpdate = React.useCallback(
    (nextOrganization: Organization) => update(id, nextOrganization),
    [id]
  );
  React.useEffect(() => {
    if (statusUpdate.successful) {
      setUpdate.reset();
      onCloseSettings();
    }
  }, [statusUpdate]);

  return (
    <>
      <VirusDashboard
        organization={organization}
        organizationId={id}
        onShowSettings={onShowSettings}
        onShowRegisterModal={onShowRegisterModal}
      />
      {settings && (
        <SettingsModal
          organization={organization}
          onUpdate={onUpdate}
          onClose={onCloseSettings}
          statusUpdate={statusUpdate}
        />
      )}
      {register && (
        <JoinOrganizationModal
          organizationId={id}
          organization={organization}
          onClose={onCloseRegisterModal}
        />
      )}
    </>
  );
};

export default withRouter(OrganizationComponent);
