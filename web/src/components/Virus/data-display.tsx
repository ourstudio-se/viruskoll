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

interface DataDisplay {
  data: VirusModel;
}

const DataDisplay = ({ data }: DataDisplay) => {
  const { t } = useTranslation();
  const healthy = React.useMemo(() => {
    if (!data || !data.healthy) {
      return null;
    }
    return data.healthy.reduce((prev, cur) => {
      const next = prev + cur.count;
      return next;
    }, 0);
  }, [data]);

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

      {data && data.healthy && data.healthy.length > 0 && (
        <Repeat large>
          <DataBoxGrid>
            <RepeatList healthList={data.healthy} count={data.count} />
            {data.count && (
              <DataBoxGridItem>
                <DataBox
                  label={t('hasSymptoms')}
                  value={`${(
                    ((data.count - healthy) / data.count) *
                    100
                  ).toFixed(1)}%`}
                  subValue={data ? numberSeparator(data.count - healthy) : '-'}
                />
              </DataBoxGridItem>
            )}
          </DataBoxGrid>
        </Repeat>
      )}
      {data && data.unhealthy && data.unhealthy.length > 0 && (
        <Repeat large>
          <H3>De med symptom har:</H3>
          <DataBoxGrid>
            <RepeatList healthList={data.unhealthy} count={data.count} />
          </DataBoxGrid>
        </Repeat>
      )}
      {data && data.workingSituation && data.workingSituation.length > 0 && (
        <Repeat large>
          <H3>Arbetssituation:</H3>
          <DataBoxGrid>
            <RepeatList healthList={data.workingSituation} count={data.count} />
          </DataBoxGrid>
        </Repeat>
      )}
    </>
  );
};

export default DataDisplay;
