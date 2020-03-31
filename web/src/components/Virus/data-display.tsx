import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Repeat from '../Repeat';
import DataBox from '../DataBox';
import Snackbar from '../Snackbar';
import { DataBoxGrid, DataBoxGridItem } from '../DataBoxGrid';
import { H3 } from '../Heading';
import { numberSeparator } from '../../utils/formats';
import RepeatList from './repeat-list';
import { VirusModel, ModalLayerData } from '../../@types/virus';

interface DataDisplay {
  data: VirusModel | ModalLayerData;
}

const DataDisplay = ({ data }: DataDisplay) => {
  const { t } = useTranslation();
  if (!data) {
    return null;
  }

  const { count, healthy, unhealthy, workingSituation } = data;
  console.log(data);
  return (
    <>
      {!count && (
        <Repeat large>
          <Repeat>
            <Snackbar
              severity="error"
              heading="Det finns ingen data för valt område"
              icon
            />
          </Repeat>
        </Repeat>
      )}

      {healthy && (
        <Repeat large>
          <DataBoxGrid>
            <DataBoxGridItem>
              <DataBox
                label={t('healthy')}
                value={`${(((healthy?.count || 0) / count) * 100).toFixed(1)}%`}
                subValue={numberSeparator(healthy.count)}
              />
            </DataBoxGridItem>
            {data.count && (
              <DataBoxGridItem>
                <DataBox
                  label={t('hasSymptoms')}
                  value={`${(((unhealthy?.count || 0) / count) * 100).toFixed(
                    1
                  )}%`}
                  subValue={numberSeparator(unhealthy.count)}
                />
              </DataBoxGridItem>
            )}
          </DataBoxGrid>
        </Repeat>
      )}

      {unhealthy && unhealthy.buckets.length > 0 && (
        <Repeat large>
          <H3>De med symptom har:</H3>
          <DataBoxGrid>
            <RepeatList
              healthList={unhealthy.buckets}
              count={unhealthy?.count || 0}
            />
          </DataBoxGrid>
        </Repeat>
      )}
      {workingSituation && workingSituation.buckets.length > 0 && (
        <Repeat large>
          <H3>Arbetssituation:</H3>
          <DataBoxGrid>
            <RepeatList
              healthList={workingSituation.buckets}
              count={workingSituation?.count || 0}
            />
          </DataBoxGrid>
        </Repeat>
      )}
    </>
  );
};

export default DataDisplay;
