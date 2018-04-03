
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import {App, Menu} from '../components';
import { syncHistoryWithStore } from 'react-router-redux'




export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
        <div className="app-container">
          <Menu history={this.props.history}/>
          <Routes className="routes"/>
        </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
