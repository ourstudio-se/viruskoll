import { useState, useCallback } from 'react';

import { jsonPost } from '../../http';
import { Person } from '../../@types/organization';

import useRequestStatus from '../../hooks/useRequestStatus';
import { RequestStatus } from '../../@types/request';

interface UseJoinOrganization {
  data: any;
  statusCreate: RequestStatus;
  register: (organizationId: string, organisation: Person) => void;
}

const useJoinOrganization = (): UseJoinOrganization => {
  const [statusCreate, setCreate] = useRequestStatus();
  const [response, setResponse] = useState<any>();

  const register = useCallback(
    async (organizationId: string, person: Person) => {
      try {
        setCreate.pending();
        const requestResponse = await jsonPost<any>(
          `/api/organizations/${organizationId}/users`,
          person
        );
        setResponse(requestResponse);
        setCreate.successful();
      } catch (e) {
        setCreate.failed();
      }
    },
    []
  );

  return {
    data: response,
    statusCreate,
    register,
  };
};

export default useJoinOrganization;
