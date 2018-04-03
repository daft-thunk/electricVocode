
import React from 'react';
import { Switch, Route } from 'react-router';
import { Login, App, Snippets, Signup, Discover, Profile, VoiceCommands, KeyboardShortcuts } from './components';
import AppContainer from './containers/App';

export default () => (
  <AppContainer>
    <Switch>
      <Route path="/snippets" component={Snippets} />
      <Route path="/main" component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/discover" component={Discover} />
      <Route path="/profile" component={Profile} />
      <Route path="/docs/voice-commands" component={VoiceCommands} />
      <Route path="/docs/keyboard-shortcuts" component={KeyboardShortcuts} />
      <Route path="/" component={Login} />
    </Switch>
  </AppContainer>
);
