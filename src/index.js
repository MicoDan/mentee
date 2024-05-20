import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Router from './Router';
import store from './store';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './globalStyle';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
    <GlobalStyle />
    <ReactTooltip />
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
