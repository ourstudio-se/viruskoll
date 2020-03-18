import { useState, useCallback } from 'react';

import useBoolState from '../../../hooks/useBoolState';
import { jsonPost } from '../../../http';
import { Organisation } from '../models';

const onRegister = (organisation: Organisation, onBeforeFetch: () => void = (): void => {},) => {
  onBeforeFetch();
  return new Promise((resolve, reject) => {
    jsonPost<any>('/api/organizations', organisation)
      .then((response) => resolve(response))
      .catch(reject);
  });
}

interface UseOrganizationRegistration {
  data: any;
  creating: boolean;
  failed: boolean;
  register: (organisation: Organisation) => void;
}

const useOrganizationRegistration = (): UseOrganizationRegistration => {
  const [creating, setCreating, resetCreating] = useBoolState(false);
  const [failed, setfailed, resetFailed] = useBoolState(false);
  const [response, setResponse] = useState<any>();

  const register = useCallback((organisation: Organisation) => {
    onRegister(organisation, () => {
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

export default useOrganizationRegistration;
