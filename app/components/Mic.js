import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import electron, { ipcRenderer } from 'electron';
import recorder from '../recorder';
import initAudio from '../audio';
import { store } from '../index';
import { addOutputThunk } from '../store/decoder.js';
import dictionary from '../utils/dictionary';

const RECORD_TIME = 2500;

/*eslint-disable class-methods-use-this*/
class Mic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audioContext: null,
      recorder: null
    };
    this.stopRecording = this.stopRecording.bind(this);
    this.blobify = this.blobify.bind(this);
    this.registerRecordShortcut = this.registerRecordShortcut.bind(this);
  }

  blobify(blob, snippets, user) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      let base64data = reader.result.split(',')[1];
      let userUrls = [
        {command: 'github',
          code: user.githubURL},
        {command: 'waffle',
          code: user.waffleURL},
        {command: 'stackoverflow',
        code: user.stackoverflowURL}
      ];
      snippets = snippets.concat(userUrls);
      store.dispatch(addOutputThunk(base64data, snippets, dictionary));
    };
  }

  stopRecording(snippets, user) {
    this.state.recorder.exportMonoWAV(blob => {
      this.blobify(blob, snippets, user);
    });
    this.state.recorder.stop();
    this.state.recorder.clear();
  }

  registerRecordShortcut(props) {
    this.state.recorder.record();
    ipcRenderer.send('startRecording');
    setTimeout(() => {
      this.stopRecording(props.snippets, props.user);
      ipcRenderer.send('stopRecording');
    }, RECORD_TIME);
  }

  componentWillReceiveProps(nextProps) {
    // this is essential for re-registering the command
    electron.remote.globalShortcut.unregisterAll();
    const componProps = nextProps;
    initAudio().then(_recorder => {
      this.setState({ recorder: _recorder }, () => {
        return electron.remote.globalShortcut.register('Alt+z', () => {
          this.registerRecordShortcut(componProps);
        });
      });
    });
  }

  render() {
    return <div style={{ width: 0 }} />;
  }
}

const mapProps = state => ({
  snippets: state.snippets,
  commands: state.commands,
  user: state.user
});

const mapDispatch = null;

export default connect(mapProps, mapDispatch)(Mic);
