import styled from 'styled-components';

export const ButtonReset = styled.button`
  display: inline-block;
  vertical-align: middle;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  font-family: ${(props) => props.theme.font};
  font-size: 1em;
  color: currentColor;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;

  :focus {
    outline: none;
  }

  ::-moz-focus-inner {
    border: 0;
  }
`;
