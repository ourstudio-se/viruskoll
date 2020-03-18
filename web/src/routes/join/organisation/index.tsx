import React from 'react';

interface Organisation {
  visible: boolean;
}


const Organisation = ({
  visible,
}: Organisation) => (
  <>
    <div>Epost{visible}</div>
    <input />

    <button type="button">Gå med</button>
  </>
);

export default Organisation;
