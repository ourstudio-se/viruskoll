import React from 'react';

import Modal from '../Modal';
import { ActionGroup, Action } from '../Modal/wrapper';
import Repeat from '../Repeat';
import OverflowBox from '../OverflowBox';
import { Button } from '../Button';

interface MapInfoModal {
  onClose: () => void;
}

const MapInfoModal = ({ onClose }: MapInfoModal) => (
  <Modal
    title="Instruktioner"
    onClose={onClose}
    footer={
      <ActionGroup>
        <Action>
          <Button fullWidth outline title="Stäng" onClick={onClose}>
            Stäng
          </Button>
        </Action>
      </ActionGroup>
    }
  >
    <Repeat>
      <OverflowBox>
        <p>Instruktioner</p>
      </OverflowBox>
    </Repeat>
  </Modal>
);

export default MapInfoModal;
