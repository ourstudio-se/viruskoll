import React from 'react';

import Page from '../../../components/Page';
import Container from '../../../components/Container';
import Content from '../../../components/Content';
import Repeat from '../../../components/Repeat';
import { Button } from '../../../components/Button';
import { H1, H2 } from '../../../components/Heading';
import { TextLight } from '../../../components/TextDecoration';
import {
  LogSymptom,
  ValidSymptoms,
  ValidDailySituations,
} from '../../../@types/log';
import useLog from './useLog';
import SuccessfulResponse from './successful-response';
import InputCheckbox from '../../../components/InputCheckbox';

interface HasSymptom {
  id: string;
}

const symptoms: Array<{ key: ValidSymptoms; value: string }> = [
  { key: 'fever', value: `Feber över 38${String.fromCharCode(176)}C` },
  { key: 'coff', value: 'Hosta' },
  { key: 'cold', value: 'Snuva' },
  { key: 'sneezing', value: 'Nysningar' },
  { key: 'sore-throat', value: 'Halsont' },
  { key: 'muscle-aches', value: 'Muskelvärk' },
  { key: 'other', value: 'Annat symptom' },
];

const dailySituations: Array<{ key: ValidDailySituations; value: string }> = [
  { key: 'as-usual', value: 'Som vanligt' },
  {
    key: 'home-protecting-others',
    value: 'Stannar hemma för att inte riskera att smitta andra',
  },
  {
    key: 'home-protecting-oneself',
    value: 'Stannar hemma för att inte bli smittad själv',
  },
  {
    key: 'home-caring-others',
    value: ' Stannar hemma för att ta hand om andra sjuka',
  },
  { key: 'home-exempted', value: 'Stannar hemma då jag blivit arbetsbefriad' },
  { key: 'home-fired', value: 'Stannar hemma då jag blivit uppsagd' },
];

const HasSymptom = ({ id }: HasSymptom) => {
  const { register, statusCreate } = useLog();
  const [answer, setAnswer] = React.useState<LogSymptom>({
    symptoms: [],
    dailySituation: undefined,
  });

  const onRegister = React.useCallback(() => {
    register(id, answer);
  }, [answer]);

  const onSymptom = React.useCallback(
    (symptom: ValidSymptoms) => {
      const nextAnswer = { ...answer };
      const index = answer.symptoms.indexOf(symptom);

      if (symptom === 'healthy') {
        nextAnswer.symptoms = [];
      } else {
        const healthyIndex = answer.symptoms.indexOf('healthy');
        if (healthyIndex > -1) {
          nextAnswer.symptoms.splice(healthyIndex);
        }
      }

      if (index === -1) {
        nextAnswer.symptoms.push(symptom);
      } else {
        nextAnswer.symptoms.splice(index, 1);
      }
      setAnswer(nextAnswer);
    },
    [answer]
  );

  const onDailySituation = React.useCallback(
    (dailySituation: ValidDailySituations) => {
      const nextAnswer = {
        ...answer,
        dailySituation,
      };
      setAnswer(nextAnswer);
    },
    [answer]
  );

  const isValid = React.useMemo(() => {
    if (!answer.dailySituation) {
      return false;
    }
    return true;
  }, [answer]);

  if (statusCreate.successful) {
    return <SuccessfulResponse />;
  }

  return (
    <Page>
      <Container textCenter>
        <Repeat large>
          <Content center>
            <H1>Fördjupande frågor</H1>
            <p>
              Du har svarat att din situation inte ser ut som vanligt. Här
              kommer lite fördjupande frågor.
            </p>
          </Content>
        </Repeat>

        <Repeat large>
          <H2>Vad har du för symptom?</H2>
        </Repeat>

        <Repeat large>
          {symptoms.map(({ key, value }) => (
            <Repeat key={`checkbox-${key}`} large>
              <InputCheckbox
                id={`checkbox-${key}`}
                checked={answer.symptoms.includes(key)}
                onChange={() => onSymptom(key)}
              >
                {value}
              </InputCheckbox>
            </Repeat>
          ))}
        </Repeat>

        <Repeat large>
          <H2>Hur ser din dagliga situation ut?</H2>
        </Repeat>
        <Repeat large>
          {dailySituations.map(({ key, value }) => (
            <Repeat key={`radio-${key}`} large>
              <InputCheckbox
                type="radio"
                id={`checkbox-${key}`}
                name="daily-situation"
                onChange={() => onDailySituation(key)}
              >
                {value}
              </InputCheckbox>
            </Repeat>
          ))}
        </Repeat>
        <Repeat large>
          <Repeat>
            <Button
              disabled={!isValid || statusCreate.pending ? true : undefined}
              onClick={onRegister}
            >
              Skicka in svar
            </Button>
          </Repeat>
          <Repeat>
            <TextLight>
              <Content center>
                <p>
                  Dina svar förblir helt anonyma och går inte knyta till en
                  enskild individ.
                </p>
              </Content>
            </TextLight>
          </Repeat>
        </Repeat>
      </Container>
    </Page>
  );
};

export default HasSymptom;
