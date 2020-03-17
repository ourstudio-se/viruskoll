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

  a img {
    border: 0;
  }
`;
