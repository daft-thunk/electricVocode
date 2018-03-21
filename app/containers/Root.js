
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import App from '../components';
import { history } from '../store/configureStore';



export default class Root extends Component {
  render() {
    return (

        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>

    );
  }
}
