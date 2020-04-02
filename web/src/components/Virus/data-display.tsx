import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Repeat from '../Repeat';
import DataBox from '../DataBox';
import Snackbar from '../Snackbar';
import { DataBoxGrid, DataBoxGridItem } from '../DataBoxGrid';
import { H3 } from '../Heading';
import { numberSeparator } from '../../utils/formats';
import RepeatList from './repeat-list';
import { VirusModel } from '../../@types/virus';

interface Props {
  data: VirusModel;
}

const DataDisplay = ({ data }: Props) => {
  const { t } = useTranslation();
  const healthy = React.useMemo(() => {
    if (!data || !data.healthy) {
      return null;
    }
    return data.healthy.buckets.reduce((prev, cur) => {
      const next = prev + cur.count;
      return next;
    }, 0);
  }, [data]);

  const unhealthy = React.useMemo(() => {
    if (healthy !== null) {
      return data.count - healthy;
    }
    return 0;
  }, [healthy]);

  if (!data) {
    return null;
  }

  return (
    <>
      {data && data.count < 4 && (
        <Repeat large>
          <Repeat>
            <Snackbar
              severity="error"
              heading="För lite data i valt område"
              icon
            >
              Ingen information visas när underlaget är för litet.
            </Snackbar>
          </Repeat>
        </Repeat>
      )}

      {data && data.healthy && data.healthy.buckets.length > 0 && (
        <Repeat large>
          <DataBoxGrid>
            <RepeatList healthList={data.healthy.buckets} count={data.count} />
            {data.count && (
              <DataBoxGridItem>
                <DataBox
                  label={t('has-symptoms')}
                  value={`${((unhealthy / data.count) * 100).toFixed(1)}%`}
                  subValue={data ? numberSeparator(unhealthy) : '-'}
                />
              </DataBoxGridItem>
            )}
          </DataBoxGrid>
        </Repeat>
      )}
      {data && data.unhealthy && data.unhealthy.buckets.length > 0 && (
        <Repeat large>
          <H3>De med symptom har:</H3>
          <DataBoxGrid>
            <RepeatList
              healthList={data.unhealthy.buckets}
              count={data.unhealthy.count}
            />
          </DataBoxGrid>
        </Repeat>
      )}
      {data && data.dailySituation && data.dailySituation.buckets.length > 0 && (
        <Repeat large>
          <H3>Vardagssituation:</H3>
          <DataBoxGrid>
            <RepeatList
              healthList={data.dailySituation.buckets}
              count={data.dailySituation.count}
            />
          </DataBoxGrid>
        </Repeat>
      )}
    </>
  );
};

export default DataDisplay;
