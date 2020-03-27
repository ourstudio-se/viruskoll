import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Portal, PortalNamespace } from '../Portal';

import { H2 } from '../Heading';
import {
  Body,
  Content,
  Dialog,
  Footer,
  Header,
  Heading,
  UiBlock,
  Wrapper,
} from './wrapper';

interface Props {
  id?: string | null;
  title: string | null;
  children: Array<JSX.Element | false> | JSX.Element | false;
  footer?: Array<JSX.Element | false> | JSX.Element | false;
  onClose: () => void;
}

const Modal = ({ id, title, onClose, children, footer }: Props) => {
  const { t } = useTranslation();

  return (
    <Portal id={id || PortalNamespace.DefaultPortal}>
      <Wrapper>
        <UiBlock onClick={onClose} title={t('closeModal')} />
        <Dialog>
          <Content>
            <Header>
              <Heading>
                <H2 noMargin>{title}</H2>
              </Heading>
            </Header>
            <Body>{children}</Body>
          </Content>
          {footer && <Footer>{footer}</Footer>}
        </Dialog>
      </Wrapper>
    </Portal>
  );
};

export default Modal;
