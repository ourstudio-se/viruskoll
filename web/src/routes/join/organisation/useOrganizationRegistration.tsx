import { useCallback } from 'react';

import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';
import useRequestStatus from '../../../hooks/useRequestStatus';
import { RequestStatus } from '../../../@types/request';

interface UseOrganizationRegistration {
  statusPost: RequestStatus;
  register: (organization: Organization) => void;
}

const useOrganizationRegistration = (): UseOrganizationRegistration => {
  const [statusPost, setPost] = useRequestStatus();

  const register = useCallback(async (organization: Organization) => {
    try {
      setPost.pending();
      await jsonPost<any>('/api/organizations', organization);
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

export default useOrganizationRegistration;
