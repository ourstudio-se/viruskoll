import { useEffect, useState, useRef } from 'react';

import useBoolState from '../../hooks/useBoolState';
import { jsonGet } from '../../http';
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

const readThroughCache = (
  id: string,
  onBeforeFetch: () => void = (): void => {},
): Promise<Organization | null> => {
  const cached = getCached(id);
  if (cached) {
    return Promise.resolve(cached);
  }

  onBeforeFetch();

  return new Promise((resolve, reject) => {
    jsonGet<Organization>(`/api/organizations/${id}`)
      .then((response) => resolve(cacheResult(id, response)))
      .catch(reject);
  });
};

interface UseOrganization {
  organization: Organization | null;
  loading: boolean;
}

const useOrganization = (id: string): UseOrganization => {
  const [fetching, setFetching, resetFetching] = useBoolState(false);
  const fetchingRef = useRef<boolean | undefined>();
  fetchingRef.current = fetching;
  const [organization, setOrganization] = useState<Organization|null>();

  useEffect(() => {
    if (id && !fetchingRef.current) {
      readThroughCache(
        id,
        () => { setFetching(); },
      )
      .then(setOrganization)
      .catch(console.log)
      .finally(() => {
        resetFetching();
      })
    }
  }, [id]);

  return {
    organization,
    loading: fetching,
  };
};

export default useOrganization;
