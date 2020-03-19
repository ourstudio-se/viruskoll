import { useState, useCallback } from 'react';

import useBoolState from '../../../hooks/useBoolState';
import { jsonPost } from '../../../http';
import { Person } from '../../../@types/organization';


interface UsePersonRegistration {
  data: any;
  creating: boolean;
  failed: boolean;
  register: (organisation: Person) => void;
}

const usePersonRegistration = (): UsePersonRegistration => {
  const [creating, setCreating, resetCreating] = useBoolState(false);
  const [failed, setfailed, resetFailed] = useBoolState(false);
  const [response, setResponse] = useState<any>();

  const register = useCallback(async(person: Person) => {
    try {
      setCreating();
      resetFailed()
      const response = await jsonPost<any>('/api/users', person)
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

export default usePersonRegistration;
