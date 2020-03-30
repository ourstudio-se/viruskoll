import React from 'react';
import { IconInfo } from '../Icon';
import { MapInfo } from '../Dashboard';
import MapInfoModal from './map-info-modal';

const MapInfoContainer = () => {
  const [modal, setModal] = React.useState(false);
  const toggleModal = React.useCallback(() => setModal(!modal), [modal]);

  return (
    <>
      <MapInfo>
        <IconInfo block onClick={toggleModal} />
      </MapInfo>
      {modal && <MapInfoModal onClose={toggleModal} />}
    </>
  );
};

export default MapInfoContainer;
