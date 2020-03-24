import { useEffect, useState, useCallback } from 'react';

import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';
import { RequestStatus } from '../../../@types/request';
import useRequestStatus from '../../../hooks/useRequestStatus';


interface UseOrganizationVerify {
  response: any;
  statusCreate: RequestStatus;
}

const useOrganizationVerify = (id: string): UseOrganizationVerify => {
  const [statusCreate, setCreate] = useRequestStatus();
  const [response, setResponse] = useState<any | null>();

  const verify = useCallback(async (_id: string) => {
    if (_id) {
      try {
        setCreate.pending();
        const result = await jsonPost<Organization>(`/api/organizations/${_id}/verifyemail`);
        setResponse(result);
        setCreate.successful();
      } catch (e) {
        setCreate.failed();
      }
    }
  }, []);

  useEffect(() => {
    verify(id);
  }, [id]);

  return {
    response,
    statusCreate,
  };
};

export default useOrganizationVerify;
