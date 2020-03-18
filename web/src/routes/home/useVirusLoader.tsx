import { useEffect, useState } from 'react';

import useBoolState from '../../hooks/useBoolState';
import { jsonPost } from '../../http';
import { VirusModel, GeoLocationModel } from './models';

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
  onBeforeFetch: () => void = (): void => {},
): Promise<VirusModel | null> => {





  const cached = getCached(payload);
  if (cached) {
    return Promise.resolve(cached);
  }

  onBeforeFetch();

  return new Promise((resolve, reject) => {
    jsonPost<VirusModel>('/api/logs/search', payload)
      .then((response) => resolve(cacheResult(payload, response)))
      .catch(reject);
  });
};

export interface VirusPayload {
  precision: number;
  sw: GeoLocationModel;
  ne: GeoLocationModel;
}

interface UseVirusLoader {
  data: VirusModel | null;
  loading: boolean;
}

const useVirusLoader = (payload: VirusPayload): UseVirusLoader => {
  const [fetching, setFetching, resetFetching] = useBoolState(false);
  const [virus, setVirus] = useState<VirusModel|null>();

  useEffect(() => {
    if (payload && !fetching) {
      readThroughCache(
        payload,
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
