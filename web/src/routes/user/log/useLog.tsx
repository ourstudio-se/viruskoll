import { useEffect, useState, useCallback } from 'react';

import { jsonPost } from '../../../http';
import { Person } from '../../../@types/person';
import useRequestStatus from '../../../hooks/useRequestStatus';
import { RequestStatus } from '../../../@types/request';
import { LogSymptom } from '../../../@types/log';

interface UseLog {
  response: any;
  statusCreate: RequestStatus;
  register: (id: string, payload: LogSymptom) => void;
}

const useLog = (id?: string, payload?: LogSymptom): UseLog => {
  const [statusCreate, setCreate] = useRequestStatus();

  const [response, setResponse] = useState<any | null>();

  const register = useCallback(async (_id: string, _payload: LogSymptom) => {
    if (_id && _payload) {
      try {
        setCreate.pending();
        const result = await jsonPost<Person>(
          `/api/users/${_id}/logs`,
          _payload
        );
        setResponse(result);
        setCreate.successful();
      } catch (e) {
        setCreate.failed();
      }
    }
  }, []);

  useEffect(() => {
    register(id, payload);
  }, []);

  return {
    response,
    statusCreate,
    register,
  };
};

export default useLog;
