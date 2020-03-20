import { useState, useCallback } from 'react';

import { jsonPost } from '../../../http';
import { Organization } from '../../../@types/organization';
import useRequestStatus from '../../../hooks/useRequestStatus';
import { RequestStatus } from '../../../@types/request';


interface UseOrganizationRegistration {
  data: any;
  statusPost: RequestStatus;
  register: (organization: Organization) => void;
}

const useOrganizationRegistration = (): UseOrganizationRegistration => {
  const [statusPost, setGet] = useRequestStatus();
  const [response, setResponse] = useState<any>();

  const register = useCallback(async (organization: Organization) => {
    try {
      setGet.pending();
      const response = await jsonPost<any>('/api/organizations', organization)
      setResponse(response);
      setGet.successful();
    } catch (e) {
      setGet.failed();
    }
  }, []);

  return {
    data: response,
    statusPost,
    register,
  };
};

export default useOrganizationRegistration;
