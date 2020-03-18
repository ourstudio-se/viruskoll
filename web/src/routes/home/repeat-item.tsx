import React from 'react';
import { useTranslation } from 'react-i18next';

import { Health } from './models';
import Repeat from '../../components/Repeat';
import DataBox from '../../components/DataBox';
import { numberSeparator } from '../../utils/formats';


interface RepeatItem {
  health: Health;
  count: number;
}

const RepeatItem = ({ health, count }: RepeatItem): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Repeat small>
      <DataBox
        label={t(health.symptom)}
        value={`${(health.count/count * 100).toFixed(1)}%`}
        subValue={numberSeparator(health.count)}
      />
    </Repeat>
  );
};

export default RepeatItem;