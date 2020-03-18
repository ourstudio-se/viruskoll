import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    }

  html,
  body,
  #root {
    height: 100%;
  }

  html {
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    background-color: ${props => props.theme.color.bg};
    color: ${props => props.theme.color.textDark};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a img {
    border: 0;
  }
`;