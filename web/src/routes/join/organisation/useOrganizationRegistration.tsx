import { useState, useCallback } from 'react';

import useBoolState from '../../../hooks/useBoolState';
import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';


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
      setCreating();
      resetFailed();
      const response = await jsonPost<any>('/api/organizations', organization)
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
