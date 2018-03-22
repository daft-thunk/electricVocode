
import React from 'react';
import { Switch, Route } from 'react-router';
import { Login, App, Signup } from './components';
import Test from './components/Test';
import AppContainer from './containers/App';

export default () => (
  <AppContainer>
    <Switch>
      <Route path="/test" component={Test} />
      <Route path="/main" component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/" component={Login} />
    </Switch>
  </AppContainer>
);
