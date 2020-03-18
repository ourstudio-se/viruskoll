import { useState, useCallback } from 'react';

import useBoolState from '../../../hooks/useBoolState';
import { jsonPost } from '../../../http';
import { Person } from '../models';

const onRegister = (person: Person, onBeforeFetch: () => void = (): void => {},) => {
  onBeforeFetch();
  return new Promise((resolve, reject) => {
    jsonPost<any>('/api/users', person)
      .then((response) => resolve(response))
      .catch(reject);
  });
}

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

  const register = useCallback((person: Person) => {
    onRegister(person, () => {
        setCreating();
        resetFailed()
      })
      .then(setResponse)
      .catch(setfailed)
      .finally(() => {
        resetCreating();
      })
  }, []);

  return {
    data: response,
    creating,
    failed,
    register,
  };
};

export default usePersonRegistration;
