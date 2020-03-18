import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');

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
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    display: flex;
    flex-direction: column;
  }

  a img {
    border: 0;
  }
`;