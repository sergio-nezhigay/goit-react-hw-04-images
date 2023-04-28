import React from 'react';
import ReactDOM from 'react-dom/client';
import 'modern-normalize';
import { Global, ThemeProvider } from '@emotion/react';
import { App } from 'components';
import { SearchProvider } from './components/hooks/searchContext';
import { GlobalStyles, theme } from 'styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <App />
      </ThemeProvider>
    </SearchProvider>
  </React.StrictMode>

  // <React.StrictMode>
  //   <ThemeProvider theme={theme}>
  //     <Global styles={GlobalStyles} />
  //     <App />
  //   </ThemeProvider>
  // </React.StrictMode>
);
