import { useEffect, useState, useRef, useCallback } from 'react';

import { jsonPost } from '../../http';
import { VirusModel, VirusPayload } from '../../@types/virus';
import useRequestStatus from '../../hooks/useRequestStatus';

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
): Promise<VirusModel | null> => {
  const cached = getCached(payload);
  if (cached) {
    return Promise.resolve(cached);
  }

  const query = organizationId
    ? `?id=${organizationId}`
    : '';

  const response = await jsonPost<VirusModel>(`/api/logs/search${query}`, payload);
  return cacheResult(payload, response);
};

interface UseVirusLoader {
  data: VirusModel | null;
  loading: boolean;
}

const useVirusLoader = (payload: VirusPayload, organizationId: string): UseVirusLoader => {
  const [statusGet, setGet] = useRequestStatus();
  const fetchingRef = useRef<boolean | undefined>();
  fetchingRef.current = statusGet.pending;
  const [virus, setVirus] = useState<VirusModel|null>();


  const fetch = useCallback(async (_payload: VirusPayload, _organizationId: string) => {
    if (_payload && !fetchingRef.current) {
      try {
        setGet.pending()
        const result = await readThroughCache(_payload, _organizationId,);
        setVirus(result);
        setGet.successful()
      } catch (e) {
        setGet.failed()
      }
    }
  }, [])

  useEffect(() => {
    fetch(payload, organizationId)
  }, [payload]);

  return {
    data: virus,
    loading: statusGet.pending,
  };
};

export default useVirusLoader;
