import { useEffect, useState, useCallback } from 'react';

import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';
import useRequestStatus from '../../../hooks/useRequestStatus';
import { RequestStatus } from '../../../@types/request';
import { LogSymptom } from '../../../@types/log';

interface UseLog {
  response: any;
  statusCreate: RequestStatus;
  register: (id: string, type: string, payload: LogSymptom) => void;
}

const useLog = (id?: string, type?: string, payload?: LogSymptom): UseLog => {
  const [statusCreate, setCreate] = useRequestStatus();

  const [response, setResponse] = useState<any | null>();

  const register = useCallback(async (_id: string, _type: string, _payload: LogSymptom) => {
    if (_id && _type && _payload) {
      try {
        setCreate.pending();
        const result = await jsonPost<Organization>(`/api/users/${_id}/log/${_type}`, _payload);
        setResponse(result);
        setCreate.successful();
      } catch (e) {
        setCreate.failed();
      }
    }
  }, [])

  useEffect(() => {
    register(id, type, payload);
  }, [id, type, payload]);

  return {
    response,
    statusCreate,
    register
  };
};

export default useLog;
