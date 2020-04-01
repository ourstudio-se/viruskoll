import React from 'react';

import Modal from '../Modal';
import { ActionGroup, Action } from '../Modal/wrapper';
import Repeat from '../Repeat';
import Content from '../Content';
import { Button } from '../Button';

interface MapInfoModal {
  onClose: () => void;
}

const MapInfoModal = ({ onClose }: MapInfoModal) => (
  <Modal
    title="Hur du använder kartan"
    onClose={onClose}
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
      <Content fullWidth>
        <p>Kartan är uppdelad i områden som består av regioner och dess kommuner. Dessa är indelade i olika färgskalor baserat på andelen personer med eller utan symptom.</p>
        <p>Du kan klicka på ett område för att få fram statistik för den regionen, eller zooma in kartan och klicka på en kommun. Statistiken är ett genomsnitt som bygger på insamlad data för varje område. Färgskalan är till för att på ett tydligare sätt visualisera skillnader mellan områdena.</p>
      </Content>
    </Repeat>
  </Modal>
);

export default MapInfoModal;
