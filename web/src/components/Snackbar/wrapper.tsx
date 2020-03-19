import styled from 'styled-components';

import { size } from '../../layout/helpers';
import theme from '../../layout/theme';

const getSnackbarBg = (severity: string | undefined): string => {
  let bg = theme.color.accent;

  if (severity === 'error') {
    bg = theme.color.ui.negativeLight;
  } else if (severity === 'warning') {
    bg = theme.color.ui.neutralLight;
  } else if (severity === 'info') {
    bg = theme.color.ui.infoLight;
  } else if (severity === 'success') {
    bg = theme.color.ui.positiveLight;
  }

  return bg;
};

interface Wrapper {
  severity?: string;
}
export const Wrapper = styled.div<Wrapper>`
  display: flex;
  align-items: center;
  padding: ${size(2)};
  background-color: ${(props): string => getSnackbarBg(props.severity)};
  color: ${(props): string => props.theme.color.textDark};
  border-radius: 4px;
`;

export const Icon = styled.div`
  flex-shrink: 0;
  padding-right: ${size(2)};
  font-size: ${size(3)};

  > svg {
    display: block;
  }
`;

export const Content = styled.div`
  flex: 1 1 auto;
  font-size: 1rem;
`;

export const Heading = styled.div`
  font-weight: 700;
`;

export const Message = styled.div`
  > * {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
