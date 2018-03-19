/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import {Main, App} from './components';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Main} />
    </Switch>
  </App>
);
