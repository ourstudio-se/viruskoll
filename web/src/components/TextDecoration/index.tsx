import styled from 'styled-components';

export const Bold = styled.span`
  font-weight: 700;
`;

export const Black = styled.span`
  font-weight: 900;
`;

export const TextLight = styled.span`
  color: ${(props) => props.theme.color.textDarkLighten};
`;
