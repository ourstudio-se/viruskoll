import i18n from 'i18next';
import React, { Suspense } from 'react';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import languageResources from './i18n';

import GlobalStyle from './layout/global-style';
import theme from './layout/theme';


const App = React.lazy(() => import('./components/app'));

const language = new URLSearchParams(window.location.search).get('l')?.substr(0, 2) || 'en';
i18n
  .use(initReactI18next)
  .init({
    resources: languageResources,
    lng: language.substr(0, 2),
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Suspense fallback={null}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>,
      document.getElementById('root'),
    );
  });
