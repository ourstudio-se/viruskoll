import { useEffect, useState, useRef, useCallback } from 'react';

import { jsonGet } from '../../http';
import useRequestStatus from '../../hooks/useRequestStatus';
import { GeoObject } from '../../@types/geo';

const _cache: { [payload: string]: object } = {};

const createCacheKey = (precision: number): string => `${precision}`;

const cacheResult = (precision: number, layer: object): object => {
  const cacheKey = createCacheKey(precision);
  _cache[cacheKey] = layer;
  return layer;
};

const getCached = (precision: number): object | null => {
  if (!precision) {
    return null;
  }
  const cacheKey = createCacheKey(precision);
  return _cache[cacheKey] || null;
};

const readThroughCache = async (precision: number): Promise<object | null> => {
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
        setLayer({
          key: _precision,
          geo: result.featuers,
        });
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
