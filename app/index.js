import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
//import {MainDF} from './components/'
import './app.global.css';
//import { history } from './store/configureStore';
// import './src/index.css';
import App from './components/App';
import { Provider } from 'react-redux';
// import { configureStore, history } from './store';
import { configureStore, history } from './store/configureStore';
import { ConnectedRouter } from 'react-router-redux';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

const store = configureStore();

ReactDOM.render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
          <NextApp store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
