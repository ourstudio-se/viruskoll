import React from 'react';
import { useTranslation } from 'react-i18next';

import { Health } from '../../@types/virus';
import DataBox from '../DataBox';
import { DataBoxGridItem} from '../DataBoxGrid';
import { numberSeparator } from '../../utils/formats';


interface RepeatItem {
  health: Health;
  count: number;
}

const RepeatItem = ({ health, count }: RepeatItem): JSX.Element => {
  const { t } = useTranslation();
  return (
    <DataBoxGridItem>
      <DataBox
        label={t(health.symptom)}
        value={`${(health.count/count * 100).toFixed(1)} %`}
        subValue={numberSeparator(health.count)}
      />
    </DataBoxGridItem>
  );
};

export default RepeatItem;
