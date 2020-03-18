import styled, { css } from 'styled-components';

import { size } from '../../layout/helpers';

export const Wrapper = styled.label`
  display: block;
  color: ${(props) => props.theme.color.textDarkLighten};
`;
