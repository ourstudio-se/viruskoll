import React from 'react';

import Repeat from '../Repeat';
import { Button } from '../Button';
import Modal from '../Modal';
import { ActionGroup, Action } from '../Modal/wrapper';
import OverflowBox from '../OverflowBox';
import GdprContent from './gdpr-content';

interface GdprModal {
  onClose: () => void;
}

const GdprModal = ({ onClose }: GdprModal) => (
  <Modal
    title="Hantering av personuppgifter (GDPR)"
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
        <GdprContent />
      </OverflowBox>
    </Repeat>
  </Modal>
);

export default GdprModal;
