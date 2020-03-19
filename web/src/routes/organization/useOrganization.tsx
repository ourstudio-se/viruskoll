import { useEffect, useState, useRef, useCallback } from 'react';

import useBoolState from '../../hooks/useBoolState';
import { jsonGet, jsonPut } from '../../http';
import { Organization } from '../../@types/organization';

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
  onBeforeFetch: () => void,
): Promise<Organization | null> => {
  const cached = getCached(id);
  if (cached) {
    return Promise.resolve(cached);
  }

  onBeforeFetch();

  return new Promise(async(resolve, reject) => {
    try {
      const response = await jsonGet<Organization>(`/api/organizations/${id}`);
      resolve(cacheResult(id, response))
    } catch (e) {
      reject(e);
    }
  });
};

const onUpdate = async (id: string, organization: Organization, onBeforeFetch: () => void): Promise<Organization | null> => {
  onBeforeFetch();
  return new Promise(async(resolve, reject) => {
    try {
      await jsonPut<Organization>(`/api/organizations/${id}`, organization)
      resolve(organization)
    } catch (e) {
      reject(e);
    }
  });
}


interface UseOrganization {
  organization: Organization | null;
  loading: boolean;
  updating: boolean;
  failedUpdate: boolean;
  successUpdate: boolean;
  resetSuccessUpdate: () => void;
  update: (id: string, nextOrganisation: Organization) => void;
}

const useOrganization = (id: string): UseOrganization => {
  const [fetching, setFetching, resetFetching] = useBoolState(false);
  const [updating, setUpdating, resetUpdating] = useBoolState(false);
  const [failedUpdate, setFailedUpdate, resetFailedUpdate] = useBoolState(false);
  const [successUpdate, setSuccessUpdate, resetSuccessUpdate] = useBoolState(false);

  const fetchingRef = useRef<boolean | undefined>();
  fetchingRef.current = fetching;
  const [organization, setOrganization] = useState<Organization|null>();

  const update = useCallback(async (id: string, organization: Organization) => {
    try {
      resetSuccessUpdate();
    const response = await onUpdate(id, organization, () => {
      setUpdating();
      resetFailedUpdate()
    })
    setOrganization(response);
    setSuccessUpdate()
    } catch (e) {
      setFailedUpdate();
    }
    resetUpdating();
  }, []);

  const fetch = useCallback(async (_id: string) => {
    if (_id && !fetchingRef.current) {
      try {
        const result = await readThroughCache(_id, setFetching,);
        setOrganization(result);
      } catch (e) {
        console.log(e);
      }
      resetFetching();
    }
  }, [])

  useEffect(() => {
    fetch(id);
  }, [id]);

  return {
    organization,
    loading: fetching,
    updating,
    update,
    failedUpdate,
    successUpdate,
    resetSuccessUpdate
  };
};

export default useOrganization;
