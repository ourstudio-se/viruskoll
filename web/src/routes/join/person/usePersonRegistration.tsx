import { useCallback } from 'react';

import { jsonPost } from '../../../http';
import { Person } from '../../../@types/organization';
import useRequestStatus from '../../../hooks/useRequestStatus';
import { RequestStatus } from '../../../@types/request';

interface UsePersonRegistration {
  statusPost: RequestStatus;
  register: (organisation: Person) => void;
}

const usePersonRegistration = (): UsePersonRegistration => {
  const [statusPost, setPost] = useRequestStatus();

  const register = useCallback(async (person: Person) => {
    try {
      setPost.pending();
      await jsonPost<any>('/api/users', person);
      setPost.successful();
    } catch (e) {
      setPost.failed();
    }
  }, []);

  return {
    statusPost,
    register,
  };
};

export default usePersonRegistration;
