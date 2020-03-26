import { useEffect, useState, useCallback } from 'react';

import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';
import useRequestStatus from '../../../hooks/useRequestStatus';
import { RequestStatus } from '../../../@types/request';

interface UseUserVerify {
  response: any;
  statusCreate: RequestStatus;
}

const useUserVerify = (id: string): UseUserVerify => {
  const [statusCreate, setCreate] = useRequestStatus();

  const [response, setResponse] = useState<any | null>();

  const verify = useCallback(async (_id: string) => {
    if (_id) {
      try {
        setCreate.pending();
        const result = await jsonPost<Organization>(
          `/api/users/${_id}/verifyemail`
        );
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

export default useUserVerify;
