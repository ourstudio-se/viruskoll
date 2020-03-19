import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.div`
  max-width: 600px;
  font-size: 1rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: ${size(1.5)};
    margin-bottom: ${size(1)};

    :first-child {
      margin-top: 0;
    }

    :last-child {
      margin-bottom: 0;
    }
  }

  p {
    margin: ${size(2)} 0;

    :first-child {
      margin-top: 0;
    }

    :last-child {
      margin-bottom: 0;
    }
  }

  ${({ fullWidth }: { fullWidth?: boolean }) =>
    fullWidth &&
    css`
      max-width: none;
    `}

  ${({ center }: { center?: boolean }) =>
    center &&
    css`
      margin: 0 auto;
    `}
`;
