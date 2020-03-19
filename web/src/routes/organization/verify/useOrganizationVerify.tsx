import { useEffect, useState, useCallback } from 'react';

import useBoolState from '../../../hooks/useBoolState';
import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';

const onVerify = async (id: string, onBeforeFetch: () => void): Promise<Organization | null> => {
  onBeforeFetch();
  return new Promise(async(resolve, reject) => {
    try {
      const response = await jsonPost<Organization>(`/api/organizations/${id}/verifyemail`)
      resolve(response)
    } catch (e) {
      reject(e);
    }
  });
}


interface UseOrganizationVerify {
  creating: boolean;
  failedCreate: boolean;
  successCreate: boolean;
}

const useOrganizationVerify = (id: string): UseOrganizationVerify => {
  const [creating, setCreating, resetCreating] = useBoolState(false);
  const [failedCreate, setFailedCreate, resetFailedCreate] = useBoolState(false);
  const [successCreate, setSuccessCreate, resetSuccessCreate] = useBoolState(false);

  const [response, setResponse] = useState<any | null>();

  const verify = useCallback(async (_id: string) => {
    resetSuccessCreate()
    resetFailedCreate();
    if (_id) {
      try {
        
        const result = await onVerify(_id, setCreating,);
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

export default useOrganizationVerify;
