import { useEffect, useState, useCallback } from 'react';

import useBoolState from '../../../hooks/useBoolState';
import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';
import useRequestStatus from '../../../hooks/useRequestStatus';
import { RequestStatus } from '../../../@types/request';

interface UseUserVerify {
  statusCreate: RequestStatus;
}

const useUserVerify = (id: string): UseUserVerify => {
  const [statusCreate, setCreate] = useRequestStatus();

  const [response, setResponse] = useState<any | null>();

  const verify = useCallback(async (_id: string) => {
    if (_id) {
      try {
        setCreate.pending();
        const result =  await jsonPost<Organization>(`/api/users/${id}/verifyemail`);
        setResponse(result);
        setCreate.successful();
      } catch (e) {
        console.log(e);
        setCreate.failed();
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

export default useUserVerify;
