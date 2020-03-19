import { useState, useCallback } from 'react';

import useBoolState from '../../../hooks/useBoolState';
import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';

const onRegister = async (organization: Organization, onBeforeFetch: () => void) => {
  onBeforeFetch();
  return new Promise(async(resolve, reject) => {
    try {
      const response = jsonPost<any>('/api/organizations', organization)
      resolve(response)
    } catch (e) {
      reject(e);
    }
  });
}

interface UseOrganizationRegistration {
  data: any;
  creating: boolean;
  failed: boolean;
  register: (organization: Organization) => void;
}

const useOrganizationRegistration = (): UseOrganizationRegistration => {
  const [creating, setCreating, resetCreating] = useBoolState(false);
  const [failed, setfailed, resetFailed] = useBoolState(false);
  const [response, setResponse] = useState<any>();

  const register = useCallback(async (organization: Organization) => {
    try {
    const response = await onRegister(organization, () => {
        setCreating();
        resetFailed()
      })
    setResponse(response);
    } catch (e) {
      setfailed();
    }
    resetCreating();
  }, []);

  return {
    data: response,
    creating,
    failed,
    register,
  };
};

export default useOrganizationRegistration;
