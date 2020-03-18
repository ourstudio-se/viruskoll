import React from 'react';

interface Organisation {
  visible: boolean;
}


const Organisation = ({
  visible
}: Organisation) => (
  <>
    <div>Epost</div>
    <input />

    <button>Gå med</button>
  </>
);

export default Organisation;