import React from 'react';

import Repeat from '../Repeat';
import { Button } from '../Button';
import Modal from '../Modal';
import { H3 } from '../Heading';
import { ActionGroup, Action } from '../Modal/wrapper';
import OverflowBox from '../OverflowBox';
import { ModalLayerData } from '../../@types/virus';
import Snackbar from '../Snackbar';
import { DataBoxGrid, DataBoxGridItem } from '../DataBoxGrid';
import { useTranslation } from 'react-i18next';
import { numberSeparator } from '../../utils/formats';
import DataBox from '../DataBox';
import RepeatList from './repeat-list';

interface LayerDataModal {
  data: ModalLayerData;
  onClose: () => void;
}

const LayerDataModal = ({ data, onClose }: LayerDataModal) => {
  const { t } = useTranslation();

  if (!data) {
    return null;
  }

  const { count, healthy, unhealthy, dailySituation, name } = data;
  const healtyAndUnhealthy = (healthy?.count || 0) + (unhealthy?.count || 0);

  return (
    <Modal
      title={name}
      onClose={onClose}
      footer={
        <ActionGroup>
          <Action>
            <Button fullWidth outline title="Stäng" onClick={onClose}>
              Stäng
            </Button>
          </Action>
        </ActionGroup>
      }
    >
      <Repeat>
        <OverflowBox>
          {count < 4 && (
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
                    value={`${(
                      (healthy.count / healtyAndUnhealthy) *
                      100
                    ).toFixed(1)}%`}
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
                <RepeatList healthList={unhealthy.buckets} count={count} />
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
        </OverflowBox>
      </Repeat>
    </Modal>
  );
};
export default LayerDataModal;
