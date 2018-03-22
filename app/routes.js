
import React from 'react';
import { Switch, Route } from 'react-router';
import {Main, App, Snippets} from './components';
import Test from './components/Test'
import HomePage from './containers/HomePage';
import AppContainer from './containers/App'

export default () => (
  <AppContainer>
    <Switch>
      <Route path="/test" component={Snippets} />
      <Route path="/" component={App} />
    </Switch>
  </AppContainer>
);
