import React from 'react';

import Repeat from '../../components/Repeat';
import { Button } from '../../components/Button';
import Modal from '../../components/Modal';
import { ActionGroup, Action } from '../../components/Modal/wrapper';
import InputText from '../../components/InputText';
import { Organization, Person } from '../../@types/organization';
import { Location } from '../../@types/location';
import { payloadIsValid } from '../join/person/validation';
import ManagementListSelectable from '../../components/ManagementList/selectable';
import useJoinOrganization from './useJoinOrganization';

const init: Person = {
  email: '',
  organizations: [],
  locations: []
}


interface JoinOrganizationModal {
  organizationId: string;
  organization: Organization;
  onClose: () => void;
}

const JoinOrganizationModal = ({
  organizationId,
  organization,
  onClose
}: JoinOrganizationModal) => {
  const {register, statusCreate} = useJoinOrganization()
  const [person, setPerson] = React.useState({
    ...init,
    organizations: [
      {
        ...organization,
        locations: []
      }
    ]
  });

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPerson({
    ...person,
    [e.currentTarget.name]: e.currentTarget.value,
  }),[person]);


  const onRemove = React.useCallback((location: Location) => {
    const nextPerson = {...person };

    const key = `${location.geolocation.lat}-${location.geolocation.lat}`
    const index = nextPerson.organizations[0].locations
      .map(x => `${x.geolocation.lat}-${x.geolocation.lat}`)
      .indexOf(key)

    nextPerson.organizations[0].locations.splice(index, 1);
    setPerson(nextPerson);
  }, [person]);

  const onAdd = React.useCallback((location: Location) => {
    const nextPerson = {...person };
    nextPerson.organizations[0].locations.push(location);
    setPerson(nextPerson);
  }, [person]);

  const onRegister = React.useCallback(() => {
    register(organizationId, person);
  }, [organizationId, person]);

  const isValid = React.useMemo(() => payloadIsValid(person), [person]);

  return (
    <Modal
        title="Registrera dig"
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
              onClick={onRegister}
              disabled={statusCreate.pending || !isValid ? true : undefined}
            >
              Gå med
            </Button>
          </Action>
        </ActionGroup>
      )}
      >
        <Repeat>
          <InputText
            label="E-postadress"
            placeholder="example@email.com"
            id="join-person-email"
            name="email"
            autocomplete="email"
            description="Ange den e-postadress där du vill ta emot frågorna angående ditt välmående."
            value={person.email}
            onChange={onChange}
          />
        </Repeat>
        <Repeat>
          {organization.locations && organization.locations.length > 0 && (
            <Repeat>
              <ManagementListSelectable
                selected={person.organizations[0].locations}
                locations={organization.locations}
                onRemove={onRemove}
                onAdd={onAdd}

              />
            </Repeat>
          )}
          {statusCreate.failed && <p>Något gick fel, försök igen.</p>}
        </Repeat>
      </Modal>
  )
}

export default JoinOrganizationModal;
