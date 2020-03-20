import { useState, useCallback } from 'react';

import { jsonPost } from '../../http';
import { Person } from '../../@types/organization';
import useRequestStatus from '../../hooks/useRequestStatus';
import { RequestStatus } from '../../@types/request';


interface UseUser {
  data: any;
  statusPost: RequestStatus;
  register: (organisation: Person) => void;
}

const useUser = (): UseUser => {
  const [statusPost, setPost] = useRequestStatus();
  const [response, setResponse] = useState<any>();

  const register = useCallback(async(person: Person) => {
    try {
      setPost.pending();
      const response = await jsonPost<any>('/api/users', person);
      setResponse(response);
      setPost.successful();
    } catch (e) {
      setPost.failed();
    }
  }, []);

  return {
    data: response,
    statusPost,
    register,
  };
};

export default useUser;
