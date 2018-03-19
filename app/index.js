import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
//import Root from './containers/Root';
import {MainDF} from './components/'
import './app.global.css';
// import './src/index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp store={store} history={history} />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
