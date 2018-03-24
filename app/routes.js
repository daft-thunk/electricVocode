
import React from 'react';
import { Switch, Route } from 'react-router';
import { Login, App, Snippets, Signup, Discover } from './components';
import Test from './components/Test';
import AppContainer from './containers/App';
import HomePage from './containers/HomePage';
import webView from './components/webView';

export default () => (
  <AppContainer>
    <Switch>
      <Route path="/webView/:adress" component={webView} />
      <Route path="/snippets" component={Snippets} />
      <Route path="/test" component={Test} />
      <Route path="/main" component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/discover" component={Discover} />
      <Route path="/" component={Login} />
    </Switch>
  </AppContainer>
);
