import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Repeat from '../Repeat';
import DataBox from '../DataBox';
import Snackbar from '../Snackbar';
import { DataBoxGrid, DataBoxGridItem } from '../DataBoxGrid';
import { H3 } from '../Heading';
import { numberSeparator } from '../../utils/formats';
import RepeatList from './repeat-list';
import { ModalLayerData } from '../../@types/virus';

interface DataDisplayHover {
  data: ModalLayerData;
}

const DataDisplayHover = ({ data }: DataDisplayHover) => {
  const { t } = useTranslation();
  if (!data) {
    return null;
  }

  const { count, healthy, unhealthy, workingSituation } = data;

  const healtyAndUnhealthy = (healthy?.count || 0) + (unhealthy?.count || 0);
  return (
    <>
      <H3>Visar data för: {data.name}</H3>
      {healtyAndUnhealthy < 4 && (
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

      {healthy && (
        <Repeat large>
          <DataBoxGrid>
            <DataBoxGridItem>
              <DataBox
                label={t('healthy')}
                value={`${((healthy.count / healtyAndUnhealthy) * 100).toFixed(
                  1
                )}%`}
                subValue={numberSeparator(healthy.count)}
              />
            </DataBoxGridItem>
            {data.count && (
              <DataBoxGridItem>
                <DataBox
                  label={t('hasSymptoms')}
                  value={`${(
                    (unhealthy.count / healtyAndUnhealthy) *
                    100
                  ).toFixed(1)}%`}
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
            <RepeatList healthList={unhealthy.buckets} count={count} />
          </DataBoxGrid>
        </Repeat>
      )}
      {workingSituation && workingSituation.buckets.length > 0 && (
        <Repeat large>
          <H3>Arbetssituation:</H3>
          <DataBoxGrid>
            <RepeatList healthList={workingSituation.buckets} count={count} />
          </DataBoxGrid>
        </Repeat>
      )}
    </>
  );
};

export default DataDisplayHover;