import { useState, useCallback } from 'react';

import { jsonPost } from '../../../http';
import { Person } from '../../../@types/organization';
import useRequestStatus from '../../../hooks/useRequestStatus';
import { RequestStatus } from '../../../@types/request';


interface UsePersonRegistration {
  data: any;
  statusPost: RequestStatus;
  register: (organisation: Person) => void;
}

const usePersonRegistration = (): UsePersonRegistration => {
  const [statusPost, setGet] = useRequestStatus();
  const [response, setResponse] = useState<any>();

  const register = useCallback(async(person: Person) => {
    try {
      setGet.pending()
      const response = await jsonPost<any>('/api/users', person)
      setResponse(response);
      setGet.successful()
    } catch (e) {
      setGet.failed()
    }
  }, []);

  return {
    data: response,
    statusPost,
    register,
  };
};

export default usePersonRegistration;
