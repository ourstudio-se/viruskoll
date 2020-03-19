import { useEffect, useState, useRef, useCallback } from 'react';

import { jsonGet, jsonPut } from '../../http';
import { Organization } from '../../@types/organization';
import useRequestStatus from '../../hooks/useRequestStatus';
import { RequestStatus, RequestSet } from '../../@types/request';

const _cache: {[payload: string]: Organization} = {};

const createCacheKey = (id: string): string =>
  id;

const cacheResult = (id: string, organization: Organization): Organization => {
  const cacheKey = createCacheKey(id);
  _cache[cacheKey] = organization;
  return organization;
};

const getCached = (id: string): Organization | null => {
  if (!id) {
    return null;
  }
  const cacheKey = createCacheKey(id);
  return _cache[cacheKey] || null;
};

const readThroughCache = async (
  id: string,
): Promise<Organization | null> => {
  const cached = getCached(id);
  if (cached) {
    return Promise.resolve(cached);
  }

  return new Promise(async(resolve, reject) => {
    try {
      const response = await jsonGet<Organization>(`/api/organizations/${id}`);
      resolve(cacheResult(id, response))
    } catch (e) {
      reject(e);
    }
  });
};

const onUpdate = async (id: string, organization: Organization): Promise<Organization | null> =>
  new Promise(async(resolve, reject) => {
    try {
      await jsonPut<Organization>(`/api/organizations/${id}`, organization)
      resolve(organization)
    } catch (e) {
      reject(e);
    }
  });


interface UseOrganization {
  organization: Organization | null;
  statusFetch: RequestStatus;
  statusUpdate: RequestStatus;
  setUpdate: RequestSet;
  update: (id: string, nextOrganisation: Organization) => void;
}

const useOrganization = (id: string): UseOrganization => {
  const [statusFetch, setFetch] = useRequestStatus();
  const [statusUpdate, setUpdate] = useRequestStatus();
  const [organization, setOrganization] = useState<Organization|null>();

  const update = useCallback(async (id: string, organization: Organization) => {
    try {
      setUpdate.pending();
      const response = await onUpdate(id, organization)
      setOrganization(response);
      setUpdate.successful();
    } catch (e) {
      setUpdate.failed();
    }
  }, []);

  const fetch = useCallback(async (_id: string) => {
    if (_id) {
      try {
        setFetch.pending();
        const result = await readThroughCache(_id);
        setOrganization(result);
        setFetch.successful();
      } catch (e) {
        setFetch.failed();
        console.log(e);
      }
    }
  }, [])

  useEffect(() => {
    fetch(id);
  }, [id]);

  return {
    organization,
    statusFetch,
    statusUpdate,
    setUpdate,
    update,
  };
};

export default useOrganization;
