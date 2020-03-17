import { useEffect, useState } from 'react';

import useBoolState from '../../hooks/useBoolState';
import { jsonGet } from '../../http';
import { ICoordinate, IVirusModel } from './models';

const URL = 'https://www.google.se';

const _cache: {[coord: string]: IVirusModel} = {};

const createCacheKey = (coord: ICoordinate): string =>
  `${coord.lat}-${coord.lon}`;

const cacheResult = (coord: ICoordinate, member: IVirusModel): IVirusModel => {
  const cacheKey = createCacheKey(coord);
  _cache[cacheKey] = member;
  return member;
};

const getCached = (coord: ICoordinate): IVirusModel | null => {
  if (!coord) {
    return null;
  }
  const cacheKey = createCacheKey(coord);
  return _cache[cacheKey] || null;
};

const readThroughCache = (
  coord: ICoordinate,
  onBeforeFetch: () => void = (): void => {},
): Promise<IVirusModel | null> => {
  const cached = getCached(coord);
  if (cached) {
    return Promise.resolve(cached);
  }

  onBeforeFetch();

  return new Promise((resolve, reject) => {
    jsonGet<IVirusModel>(`${URL}/virus`)
      .then((member) => resolve(cacheResult(coord, member)))
      .catch(reject);
  });
};

interface IUseVirusLoader {
  data: IVirusModel | null;
  loading: boolean;
}

interface IProps {
  coord: ICoordinate;
}

const useMember = (coord: ICoordinate): IUseVirusLoader => {
  const [fetching, setFetching, resetFetching] = useBoolState(false);
  const [virus, setVirus] = useState<IVirusModel|null>();

  useEffect(() => {
    if (coord) {
      readThroughCache(
        coord,
        () => { setFetching(); },
      )
        .then(setVirus)
        .catch(console.error)
        .finally(() => {
          resetFetching();
        });
    }
  }, [coord]);

  return {
    data: virus,
    loading: fetching,
  };
};

export default useMember;
