import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Repeat from '../Repeat';
import DataBox from '../DataBox';
import Snackbar from '../Snackbar';
import { DataBoxGrid, DataBoxGridItem } from '../DataBoxGrid';
import { H3 } from '../Heading';
import { numberSeparator } from '../../utils/formats';
import RepeatList from './repeat-list';
import { DataSource } from '../../@types/virus';

interface Props {
  data: DataSource;
}

const DataDisplay = ({ data }: Props) => {
  const { t } = useTranslation();
  if (!data) {
    return null;
  }

  const count = data.count || 0;

  if (count < 4) {
    return (
      <Repeat large>
        <Repeat>
          <Snackbar severity="error" heading="För lite data i valt område" icon>
            Ingen information visas när underlaget är för litet.
          </Snackbar>
        </Repeat>
      </Repeat>
    );
  }

  const { healthy, unhealthy, dailySituation } = data;
  const healthyCount = healthy?.count || 0;
  const unhealthyCount = unhealthy?.count || 0;

  return (
    <>
      {healthy?.buckets.length > 0 && (
        <Repeat large>
          <DataBoxGrid>
            <DataBoxGridItem>
              <DataBox
                label={t('healthy')}
                value={`${((healthyCount / count) * 100).toFixed(1)} %`}
                subValue={numberSeparator(healthyCount)}
              />
            </DataBoxGridItem>
            <DataBoxGridItem>
              <DataBox
                label={t('has-symptoms')}
                value={`${((unhealthyCount / count) * 100).toFixed(1)} %`}
                subValue={data ? numberSeparator(unhealthyCount) : '-'}
              />
            </DataBoxGridItem>
          </DataBoxGrid>
        </Repeat>
      )}
      {unhealthy?.buckets.length > 0 && (
        <Repeat large>
          <H3>De med symptom har:</H3>
          <DataBoxGrid>
            <RepeatList
              healthList={unhealthy.buckets}
              count={unhealthy.count}
            />
          </DataBoxGrid>
        </Repeat>
      )}
      {dailySituation?.buckets.length > 0 && (
        <Repeat large>
          <H3>Vardagssituation:</H3>
          <DataBoxGrid>
            <RepeatList
              healthList={dailySituation.buckets}
              count={dailySituation.count}
            />
          </DataBoxGrid>
        </Repeat>
      )}
    </>
  );
};

export default DataDisplay;
