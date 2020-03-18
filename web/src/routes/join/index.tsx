import React from 'react';
import Person from './person';
import Organisation from './organisation';



const Join = () => {
  const [tab, setTab]= React.useState(0);

  const onTabChange = React.useCallback((nextTab) => setTab(nextTab), [tab])

  return(
    <>
      <p>join</p>
      <button onClick={() => onTabChange(0)}>Person</button>
      <button onClick={() => onTabChange(1)}>Organisation</button>

      <Person visible={tab === 0} />
      <Organisation visible={tab === 1} />
    </>
  );
}

export default Join;