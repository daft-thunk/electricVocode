
import React from 'react';
import { Switch, Route } from 'react-router';
import {Main, App} from './components';
import Test from './components/Test'
import HomePage from './containers/HomePage';
import AppContainer from './containers/App'

export default () => (
  <AppContainer>
    <Switch>
      <Route path="/" component={App} />
      <Route exact path="/test" component={Test} />
    </Switch>
  </AppContainer>
);
