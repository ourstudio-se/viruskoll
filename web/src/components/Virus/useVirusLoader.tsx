import { useEffect, useState, useRef, useCallback } from 'react';

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

const readThroughCache = async (
  payload: VirusPayload,
  organizationId: string,
  onBeforeFetch: () => void,
): Promise<VirusModel | null> => {
  const cached = getCached(payload);
  if (cached) {
    return Promise.resolve(cached);
  }

  onBeforeFetch();

  const query = organizationId
    ? `?id=${organizationId}`
    : '';

  return new Promise(async(resolve, reject) => {
    try {
      const response = await jsonPost<VirusModel>(`/api/logs/search${query}`, payload)
      resolve(cacheResult(payload, response))
    } catch (e) {
      reject(e);
    }
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


  const fetch = useCallback(async (_payload: VirusPayload, _organizationId: string) => {
    if (_payload && !fetchingRef.current) {
      try {
        const result = await readThroughCache(_payload, _organizationId, setFetching,);
        setVirus(result);
      } catch (e) {
        console.log(e);
      }
      resetFetching();
    }
  }, [])

  useEffect(() => {
    fetch(payload, organizationId)
  }, [payload]);

  return {
    data: virus,
    loading: fetching,
  };
};

export default useVirusLoader;
