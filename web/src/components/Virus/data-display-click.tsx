import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from 'styled-components';

import Repeat from '../Repeat';
import DataBox from '../DataBox';
import Snackbar from '../Snackbar';
import { DataBoxGrid, DataBoxGridItem } from '../DataBoxGrid';
import { H3 } from '../Heading';
import { numberSeparator } from '../../utils/formats';
import RepeatList from './repeat-list';
import theme from '../../layout/theme';
import { ModalLayerData } from '../../@types/virus';

interface DataDisplayClick {
  data: ModalLayerData;
}

const DataDisplayClick = ({ data }: DataDisplayClick) => {
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  const { count, healthy, unhealthy, dailySituation } = data;
  const healtyAndUnhealthy = (healthy?.count || 0) + (unhealthy?.count || 0);

  return (
    <ThemeProvider theme={theme}>
      <H3>{data.name}</H3>
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
                value={`${((healthy.count / healtyAndUnhealthy) * 100).toFixed(
                  1
                )}%`}
                subValue={numberSeparator(healthy.count)}
              />
            </DataBoxGridItem>
            {data.count && (
              <DataBoxGridItem>
                <DataBox
                  label={t('has-symptoms')}
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
            <RepeatList
              healthList={unhealthy.buckets}
              count={unhealthy.count}
            />
          </DataBoxGrid>
        </Repeat>
      )}
      {dailySituation && dailySituation.buckets.length > 0 && (
        <Repeat large>
          <H3>Arbetssituation:</H3>
          <DataBoxGrid>
            <RepeatList healthList={dailySituation.buckets} count={count} />
          </DataBoxGrid>
        </Repeat>
      )}
    </ThemeProvider>
  );
};

export default DataDisplayClick;
