import { useEffect, useState, useCallback } from 'react';

import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';
import { RequestStatus } from '../../../@types/request';
import useRequestStatus from '../../../hooks/useRequestStatus';


interface UseOrganizationVerify {
  statusCreate: RequestStatus;
}

const useOrganizationVerify = (id: string): UseOrganizationVerify => {
  const [statusCreate, setCreate] = useRequestStatus();
  const [response, setResponse] = useState<any | null>();

  const verify = useCallback(async (_id: string) => {
    if (_id) {
      try {
        setCreate.pending();
        const result = await jsonPost<Organization>(`/api/organizations/${id}/verifyemail`)
        setResponse(result);
        setCreate.successful()
      } catch (e) {
        console.log(e);
        setCreate.failed()
      }
    }
  }, [])

  useEffect(() => {
    verify(id);
  }, [id]);

  return {
    statusCreate
  };
};

export default useOrganizationVerify;
