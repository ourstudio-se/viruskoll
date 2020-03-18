import React from 'react';

interface Person {
  visible: boolean;
}

const Person = ({
  visible
}) => (
<>
    <div>Namn</div>
    <input />

    <div>Domän</div>
    <input />

    <button>Gå med</button>
  </>
);

export default Person;