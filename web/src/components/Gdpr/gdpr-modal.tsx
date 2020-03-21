import React from 'react';

import Repeat from '../../components/Repeat';
import { Button } from '../../components/Button';
import Modal from '../../components/Modal';
import { ActionGroup, Action } from '../../components/Modal/wrapper';
import OverflowBox from '../OverflowBox';
import GdprContent from './gdpr-content';

interface GdprModal {
  onClose: () => void;
}

const GdprModal = ({
  onClose
}: GdprModal) => (
  <Modal
      title="Hantering av personuppgifter (GDPR)"
      onClose={onClose}
      footer={(
      <ActionGroup>
        <Action>
          <Button fullWidth outline title="Stäng" onClick={onClose}>
            Stäng
          </Button>
        </Action>
      </ActionGroup>
    )}
    >
      <Repeat>
        <OverflowBox>
          <GdprContent />
        </OverflowBox>
      </Repeat>
    </Modal>
);

export default GdprModal;
