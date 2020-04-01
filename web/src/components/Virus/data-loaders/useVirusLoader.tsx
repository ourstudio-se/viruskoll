import { useEffect, useState, useRef, useCallback } from 'react';

import { jsonPost } from '../../../http';
import { VirusModel, VirusPayload } from '../../../@types/virus';
import useRequestStatus from '../../../hooks/useRequestStatus';

const _cache: { [payload: string]: VirusModel } = {};

const createCacheKey = (zoom: number): string => `${zoom}`;

const cacheResult = (zoom: number, result: VirusModel): VirusModel => {
  const data = {
    ...result,
    zoom,
  };
  const cacheKey = createCacheKey(zoom);
  _cache[cacheKey] = data;
  return data;
};

const getCached = (zoom: number): VirusModel | null => {
  if (!zoom) {
    return null;
  }
  const cacheKey = createCacheKey(zoom);
  return _cache[cacheKey] || null;
};

const staticPayload: VirusPayload = {
  precision: 0,
  sw: {
    lat: -89.999946958315,
    lon: -180,
  },
  ne: { lat: 89.99999348552312, lon: 180 },
};

const readThroughCache = async (zoom: number): Promise<VirusModel | null> => {
  const cached = getCached(zoom);
  if (cached) {
    return Promise.resolve(cached);
  }

  const payload = {
    ...staticPayload,
    precision: zoom,
  };

  const response = await jsonPost<VirusModel>('/api/logs/search', payload);
  return cacheResult(zoom, response);
};

interface UseVirusLoader {
  data: VirusModel | null;
  loading: boolean;
}

const useVirusLoader = (zoom: number): UseVirusLoader => {
  const [statusGet, setGet] = useRequestStatus();
  const fetchingRef = useRef<boolean | undefined>();
  fetchingRef.current = statusGet.pending;
  const [virus, setVirus] = useState<VirusModel | null>();

  const fetch = useCallback(async (_zoom: number) => {
    if (_zoom && !fetchingRef.current) {
      try {
        setGet.pending();
        const result = await readThroughCache(_zoom);
        setVirus(result);
        setGet.successful();
      } catch (e) {
        setGet.failed();
      }
    }
  }, []);

  useEffect(() => {
    fetch(zoom);
  }, [zoom]);

  return {
    data: virus,
    loading: statusGet.pending,
  };
};

export default useVirusLoader;
