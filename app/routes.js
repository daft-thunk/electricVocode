
import React from 'react';
import { Switch, Route } from 'react-router';
import {Main, Test, App} from './components';
import HomePage from './containers/HomePage';
// import App from './containers/App'

export default () => (
    <Switch>
      <Route path="/" component={App} />
      <Route path="/test" component={Test} />
    </Switch>
);
