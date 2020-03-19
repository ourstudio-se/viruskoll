import React from 'react';

import Repeat from '../../components/Repeat';
import { Button } from '../../components/Button';
import Modal from '../../components/Modal';
import { ActionGroup, Action } from '../../components/Modal/wrapper';
import InputText from '../../components/InputText';
import SearchSuggestion from '../../components/location/search-suggestion';
import { Organization } from '../../@types/organization';
import { Location } from '../../@types/location';
import { payloadIsValid } from '../join/organisation/validation';
import ManagementList from '../../components/ManagementList';
import { RequestStatus } from '../../@types/request';

interface SettingsModal {
  organization: Organization;
  statusUpdate: RequestStatus;
  onUpdate: (nextOrganization: Organization) => void;
  onClose: () => void;
}

const SettingsModal = ({
  organization,
  onUpdate,
  statusUpdate,
  onClose
}: SettingsModal) => {
  const [localOrganization, setLocalOrganization] = React.useState(organization)

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setLocalOrganization({
    ...localOrganization,
    [e.currentTarget.name]: e.currentTarget.value,
  }),[localOrganization]);

  const onAddLocation = React.useCallback((location: Location) => {
    const nextOrganisation = {...localOrganization };
    nextOrganisation.locations.push(location);
    setLocalOrganization(nextOrganisation);
  }, [localOrganization])

  const onRemove = React.useCallback((index: number) => {
    const nextOrganisation = {...localOrganization };
    nextOrganisation.locations.splice(index, 1);
    setLocalOrganization(nextOrganisation);
  }, []);

  const isValid = React.useMemo(() => payloadIsValid(localOrganization), [localOrganization]);
  const hasChanged = React.useMemo(() =>
    JSON.stringify(localOrganization).localeCompare(JSON.stringify(organization)) !== 0,
    [organization, localOrganization])

    const onSave = React.useCallback(() => {
      onUpdate(localOrganization);
    }, [localOrganization]);

  return (
    <Modal
        title="Inställningar"
        onClose={onClose}
        footer={(
        <ActionGroup>
          <Action>
            <Button fullWidth outline title="Avbryt" onClick={onClose}>
              Avbryt
            </Button>
          </Action>
          <Action>
            <Button
              fullWidth
              title="Spara"
              onClick={onSave}
              disabled={!hasChanged || statusUpdate.pending || !isValid ? true : undefined}
            >
              Spara
            </Button>
          </Action>
        </ActionGroup>
      )}
      >
        <Repeat>
          <InputText
            label="Företagets namn"
            placeholder="Företagets namn"
            id="join-org-name"
            name="name"
            value={localOrganization.name}
            onChange={onChange}
          />
        </Repeat>
        <Repeat>
          <Repeat>
            <SearchSuggestion
              onAddLocation={onAddLocation}
              label="Lägg till kontor"
              description="Ange kontorets adress."
              action="Lägg till"
              placeholder="Sök plats..."
            />
          </Repeat>
          {localOrganization.locations && localOrganization.locations.length > 0 && (
            <Repeat>
              <ManagementList
                locations={localOrganization.locations}
                onRemove={onRemove}

              />
            </Repeat>
          )}
          {statusUpdate.failed && <p>Något gick fel, försök igen.</p>}
        </Repeat>
      </Modal>
  )
}

export default SettingsModal;
