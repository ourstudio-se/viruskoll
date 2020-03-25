import React from 'react';

import Page from '../../../components/Page';
import Container from '../../../components/Container';
import Content from '../../../components/Content';
import Repeat from '../../../components/Repeat';
import { Button } from '../../../components/Button';
import { H1, H2 } from '../../../components/Heading';
import { TextLight } from '../../../components/TextDecoration';
import { LogSymptom, ValidSymptoms, ValidWorkSituations } from '../../../@types/log';
import useLog from './useLog';
import SuccessfulResponse from './successful-response';
import InputCheckbox from '../../../components/InputCheckbox';

interface HasSymptom {
  id: string;
}

const HasSymptom = ({ id }: HasSymptom) => {
  const { register, statusCreate } = useLog();
  const [answer, setAnswer] = React.useState<LogSymptom>({
    symptoms: [],
    workSituation: undefined,
  });

  const onRegister = React.useCallback(() => {
    register(id, answer);
  }, [answer]);

  const onSymptom = React.useCallback((symptom: ValidSymptoms) => {
    const nextAnswer = { ...answer };
    const index = answer.symptoms.indexOf(symptom);
    if (index === -1) {
      nextAnswer.symptoms.push(symptom);
    } else {
      nextAnswer.symptoms.splice(index, 1);
    }
    setAnswer(nextAnswer);
  }, [answer]);

  const isValid = React.useMemo(() => {
    if (!answer.symptoms.length) {
      return false;
    }

    if (!answer.workSituation) {
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
              Du har svarat att du inte mår helt bra. Här kommer lite
              fördjupande frågor.
            </p>
          </Content>
        </Repeat>
        <Repeat large>
          <Repeat large>
            <InputCheckbox
              id="checkbox-fever"
              onChange={() => onSymptom('fever')}
            >
              Feber över 38&#8451;
            </InputCheckbox>
          </Repeat>
          <Repeat large>
            <InputCheckbox
              id="checkbox-coff"
              onChange={() => onSymptom('coff')}
            >
              Hosta
            </InputCheckbox>
          </Repeat>
          <Repeat large>
            <InputCheckbox
              id="checkbox-cold"
              onChange={() => onSymptom('cold')}
            >
              Snuva
            </InputCheckbox>
          </Repeat>
          <Repeat large>
            <InputCheckbox
              id="checkbox-sneezing"
              onChange={() => onSymptom('sneezing')}
            >
              Nysningar
            </InputCheckbox>
          </Repeat>
          <Repeat large>
            <InputCheckbox
              id="checkbox-sore-throat"
              onChange={() => onSymptom('sore-throat')}
            >
              Halsont
            </InputCheckbox>
          </Repeat>
          <Repeat large>
            <InputCheckbox
              id="checkbox-muscle-aches"
              onChange={() => onSymptom('muscle-aches')}
            >
              Muskelvärk
            </InputCheckbox>
          </Repeat>
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
