import { useEffect, useState, useCallback } from 'react';

import useBoolState from '../../../hooks/useBoolState';
import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';

interface UseUserVerify {
  creating: boolean;
  failedCreate: boolean;
  successCreate: boolean;
}

const useUserVerify = (id: string): UseUserVerify => {
  const [creating, setCreating, resetCreating] = useBoolState(false);
  const [failedCreate, setFailedCreate, resetFailedCreate] = useBoolState(false);
  const [successCreate, setSuccessCreate, resetSuccessCreate] = useBoolState(false);

  const [response, setResponse] = useState<any | null>();

  const verify = useCallback(async (_id: string) => {
    resetSuccessCreate()
    resetFailedCreate();
    if (_id) {
      try {
        setCreating();
        const result =  await jsonPost<Organization>(`/api/users/${id}/verifyemail`);
        setResponse(result);
        setSuccessCreate()
      } catch (e) {
        console.log(e);
        setFailedCreate()
      }
      resetCreating();
    }
  }, [])

  useEffect(() => {
    verify(id);
  }, [id]);

  return {
    creating,
    failedCreate,
    successCreate,
  };
};

export default useUserVerify;
