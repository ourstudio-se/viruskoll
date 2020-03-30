import { useEffect, useState, useRef, useCallback } from 'react';

import { jsonGet } from '../../../http';
import useRequestStatus from '../../../hooks/useRequestStatus';
import { GeoObject } from '../../../@types/geo';

const _cache: { [payload: string]: GeoObject } = {};

const createCacheKey = (precision: number): string => `${precision}`;

const cacheResult = (precision: number, layer: object): GeoObject => {
  const cacheKey = createCacheKey(precision);

  const result: GeoObject = {
    key: precision,
    geo: layer.featuers,
  };

  _cache[cacheKey] = result;
  return result;
};

const getCached = (precision: number): GeoObject | null => {
  if (!precision) {
    return null;
  }
  const cacheKey = createCacheKey(precision);
  return _cache[cacheKey] || null;
};

const readThroughCache = async (
  precision: number
): Promise<GeoObject | null> => {
  const cached = getCached(precision);
  if (cached) {
    return Promise.resolve(cached);
  }

  const response = await jsonGet<object>(`/api/locations/${precision}`);
  return cacheResult(precision, response);
};

interface UseGeoLoader {
  layer: GeoObject;
  loading: boolean;
}

const useGeoLoader = (precision: number): UseGeoLoader => {
  const [statusGet, setGet] = useRequestStatus();
  const fetchingRef = useRef<boolean | undefined>();
  fetchingRef.current = statusGet.pending;
  const [layer, setLayer] = useState<GeoObject | null>(null);

  const fetch = useCallback(async (_precision: number) => {
    if (_precision && !fetchingRef.current) {
      try {
        setGet.pending();
        const result = await readThroughCache(_precision);
        setLayer(result);
        setGet.successful();
      } catch (e) {
        setGet.failed();
      }
    }
  }, []);

  useEffect(() => {
    fetch(precision);
  }, [precision]);

  return {
    layer,
    loading: statusGet.pending,
  };
};

export default useGeoLoader;
