import { useEffect, useState, useCallback } from 'react';

import { jsonGet } from '../../../http';
import { Person } from '../../../@types/organization';
import useRequestStatus from '../../../hooks/useRequestStatus';
import { RequestStatus } from '../../../@types/request';

interface UseUser {
  user: Person | null;
  statusGet: RequestStatus;
}

const useUser = (id: string): UseUser => {
  const [statusGet, setGet] = useRequestStatus();

  const [user, setUser] = useState<Person | null>();

  const get = useCallback(async (_id: string) => {
    if (_id) {
      try {
        setGet.pending();
        const result = await jsonGet<Person>(`/api/users/${_id}`);
        setUser(result);
        setGet.successful();
      } catch (e) {
        setGet.failed();
      }
    }
  }, [])

  useEffect(() => {
    get(id);
  }, []);

  return {
    user,
    statusGet
  };
};

export default useUser;
