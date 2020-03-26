import React from 'react';
import RepeatItem from './repeat-item';
import { Health } from '../../@types/virus';

interface RepeatList {
  healthList: Health[];
  count: number;
}

const RepeatList = ({ healthList, count }: RepeatList): JSX.Element => (
  <>
    {healthList.map((health) => (
      <RepeatItem key={health.symptom} health={health} count={count} />
    ))}
  </>
);

export default RepeatList;
