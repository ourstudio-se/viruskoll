import { useState, useCallback } from 'react';

import useBoolState from '../../hooks/useBoolState';
import { jsonPost } from '../../http';
import { Person } from '../../@types/organization';


interface UseJoinOrganization {
  data: any;
  creating: boolean;
  failed: boolean;
  register: (organizationId: string, organisation: Person) => void;
}

const useJoinOrganization = (): UseJoinOrganization => {
  const [creating, setCreating, resetCreating] = useBoolState(false);
  const [failed, setfailed, resetFailed] = useBoolState(false);
  const [response, setResponse] = useState<any>();

  const register = useCallback(async(organizationId: string, person: Person) => {
    try {
      setCreating();
      resetFailed()
      const response = await jsonPost<any>(`/api/organization/${organizationId}/users`, person);
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

export default useJoinOrganization;
