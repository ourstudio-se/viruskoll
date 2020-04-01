import React from 'react';

import Repeat from '../../components/Repeat';
import { Button } from '../../components/Button';
import Modal from '../../components/Modal';
import { ActionGroup, Action } from '../../components/Modal/wrapper';
import GdprContent from './gdpr-content';

interface GdprModal {
  onClose: () => void;
}

const GdprModal = ({ onClose }: GdprModal) => (
  <Modal
    title="Hantering av personuppgifter (GDPR)"
    onClose={onClose}
    size="large"
    footer={
      <ActionGroup>
        <Action>
          <Button fullWidth title="Stäng" onClick={onClose}>
            Stäng
          </Button>
        </Action>
      </ActionGroup>
    }
  >
    <Repeat>
      <GdprContent />
    </Repeat>
  </Modal>
);

export default GdprModal;
