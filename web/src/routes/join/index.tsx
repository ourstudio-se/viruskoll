import React from 'react';
import Person from './person';
import Organisation from './organisation';

import Container from '../../components/Container';
import { H1 } from '../../components/Heading';

const Join = () => {
  const [tab, setTab] = React.useState(0);
  const onTabChange = React.useCallback((nextTab) => setTab(nextTab), [tab]);

  return (
    <Container>
      <H1>join</H1>
      <button type="button" onClick={() => onTabChange(0)}>Person</button>
      <button type="button" onClick={() => onTabChange(1)}>Organisation</button>

      <Person visible={tab === 0} />
      <Organisation visible={tab === 1} />
    </Container>
  );
};

export default Join;
