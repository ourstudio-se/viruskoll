import React from 'react';

import Container from '../../../components/Container';
import Content from '../../../components/Content';
import Repeat from '../../../components/Repeat';
import { Button } from '../../../components/Button';
import { H1 } from '../../../components/Heading';

const SuccessfulResponse = () => (
  <Container textCenter>
    <Repeat large>
      <Content center>
        <H1>Tack för dina svar!</H1>
        <p>Tack för att du tog din tid till att hjälpa oss och många andra att göra samhället en tjänst.</p>
      </Content>
    </Repeat>
    <Repeat large>
      <Button outline>
        Gå till startsidan
      </Button>
    </Repeat>
  </Container>
);

export default SuccessfulResponse;
