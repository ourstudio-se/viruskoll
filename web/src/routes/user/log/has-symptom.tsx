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
  ValidWorkSituations,
} from '../../../@types/log';
import ToggleTabsLog from '../../../components/ToggleTabs/toggle-tabs-log';
import TabContainer from '../../../components/ToggleTabs/tab-container';
import Tab from '../../../components/ToggleTabs/tab';
import useLog from './useLog';
import SuccessfulResponse from './successful-response';

interface HasSymptom {
  id: string;
}

const HasSymptom = ({ id }: HasSymptom) => {
  const { register, statusCreate } = useLog();
  const [answer, setAnswer] = React.useState<LogSymptom>({
    symptoms: [],
    workSituation: undefined,
  });
  const [isWorking, setIsWorking] = React.useState<boolean | undefined>();

  const onRegister = React.useCallback(() => {
    register(id, answer);
  }, [answer]);

  const onSwitch = (value: boolean) => {
    if (value !== isWorking) {
      const nextAnswer = {
        ...answer,
        workSituation: undefined,
      };
      setAnswer(nextAnswer);
      setIsWorking(value);
    }
  };

  const onSymptom = React.useCallback(
    (symptom: ValidSymptoms) => {
      const nextAnswer = { ...answer };
      const index = answer.symptoms.indexOf(symptom);
      if (index === -1) {
        nextAnswer.symptoms.push(symptom);
      } else {
        nextAnswer.symptoms.splice(index, 1);
      }
      setAnswer(nextAnswer);
    },
    [answer]
  );

  const onWorkSituation = React.useCallback(
    (workSituation: ValidWorkSituations) => {
      const nextAnswer = {
        ...answer,
        workSituation,
      };
      setAnswer(nextAnswer);
    },
    [answer]
  );

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
            <H2>Har du feber?</H2>
            <ToggleTabsLog
              active={answer.symptoms.includes('fever')}
              onClick={() => onSymptom('fever')}
            />
          </Repeat>
          <Repeat large>
            <H2>Har du torrhosta?</H2>
            <ToggleTabsLog
              active={answer.symptoms.includes('coff')}
              onClick={() => onSymptom('coff')}
            />
          </Repeat>
          <Repeat large>
            <H2>Är du förkyld?</H2>
            <ToggleTabsLog
              active={answer.symptoms.includes('cold')}
              onClick={() => onSymptom('cold')}
            />
          </Repeat>
          <Repeat large>
            <H2>Jobbar/studerar du?</H2>
            <TabContainer>
              <Tab
                active={isWorking !== undefined && isWorking}
                displayName="Ja"
                onClick={() => onSwitch(true)}
              />
              <Tab
                active={isWorking !== undefined && !isWorking}
                displayName="Nej"
                onClick={() => onSwitch(false)}
              />
            </TabContainer>
          </Repeat>
          {isWorking !== undefined && isWorking && (
            <Repeat large>
              <H2>Jobbar/studerar du hemifrån?</H2>
              <TabContainer>
                <Tab
                  active={answer.workSituation === 'work-from-home'}
                  displayName="Ja"
                  onClick={() => onWorkSituation('work-from-home')}
                />
                <Tab
                  active={answer.workSituation === 'at-work'}
                  displayName="Nej"
                  onClick={() => onWorkSituation('at-work')}
                />
              </TabContainer>
            </Repeat>
          )}
          {isWorking !== undefined && !isWorking && (
            <Repeat large>
              <H2>Tar du hand om sjuka barn?</H2>
              <TabContainer>
                <Tab
                  active={answer.workSituation === 'child-care'}
                  displayName="Ja"
                  onClick={() => onWorkSituation('child-care')}
                />
                <Tab
                  active={answer.workSituation === 'home-no-work'}
                  displayName="Nej"
                  onClick={() => onWorkSituation('home-no-work')}
                />
              </TabContainer>
            </Repeat>
          )}
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
