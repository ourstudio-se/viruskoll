import { useEffect, useState, useRef } from 'react';

import useBoolState from '../../hooks/useBoolState';
import { jsonPost } from '../../http';
import { VirusModel, VirusPayload } from '../../@types/virus';

const _cache: {[payload: string]: VirusModel} = {};

const createCacheKey = (payload: VirusPayload): string =>
  JSON.stringify(payload);

const cacheResult = (payload: VirusPayload, member: VirusModel): VirusModel => {
  const cacheKey = createCacheKey(payload);
  _cache[cacheKey] = member;
  return member;
};

const getCached = (payload: VirusPayload): VirusModel | null => {
  if (!payload) {
    return null;
  }
  const cacheKey = createCacheKey(payload);
  return _cache[cacheKey] || null;
};

const readThroughCache = (
  payload: VirusPayload,
  organizationId: string,
  onBeforeFetch: () => void = (): void => {},
): Promise<VirusModel | null> => {
  const cached = getCached(payload);
  if (cached) {
    return Promise.resolve(cached);
  }

  onBeforeFetch();

  const query = organizationId
    ? `?id=${organizationId}`
    : '';

  return new Promise((resolve, reject) => {
    jsonPost<VirusModel>(`/api/logs/search${query}`, payload)
      .then((response) => resolve(cacheResult(payload, response)))
      .catch(reject);
  });
};

interface UseVirusLoader {
  data: VirusModel | null;
  loading: boolean;
}

const useVirusLoader = (payload: VirusPayload, organizationId: string): UseVirusLoader => {
  const [fetching, setFetching, resetFetching] = useBoolState(false);
  const fetchingRef = useRef<boolean | undefined>();
  fetchingRef.current = fetching;
  const [virus, setVirus] = useState<VirusModel|null>();

  useEffect(() => {
    if (payload && !fetchingRef.current) {
      readThroughCache(
        payload,
        organizationId,
        () => { setFetching(); },
      )
      .then(setVirus)
      .catch(console.log)
      .finally(() => {
        resetFetching();
      })
    }
  }, [payload]);

  return {
    data: virus,
    loading: fetching,
  };
};

export default useVirusLoader;
