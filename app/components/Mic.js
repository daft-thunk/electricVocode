import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import electron, { ipcRenderer } from 'electron';
import recorder from '../recorder';
import initAudio from '../audio';
import { store } from '../index';
import { addOutputThunk } from '../store/decoder.js';
import dictionary from '../utils/dictionary';

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
  }

  blobify(blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      let base64data = reader.result.split(',')[1];
      store.dispatch(addOutputThunk(base64data, this.props.snippets, dictionary));
    };
  }

  stopRecording() {
    // console.log(recorder)
    this.state.recorder.exportMonoWAV(blob => {
      console.log(blob);
      this.blobify(blob, this.props);
    });
    this.state.recorder.stop();
    this.state.recorder.clear();
  }

  parseCommand(input) {
    const words = input.split(' ');
    const parsed = words.map(word => {
      if (dictionary[word]) return `▵${word}▵`;
      else return word;
    });
    return parsed;
  }

  componentDidMount() {
    initAudio().then(_recorder => {
      this.setState({ recorder: _recorder }, () =>
        electron.remote.globalShortcut.register('Alt+z', () => {
          this.state.recorder.record();
          ipcRenderer.send('startRecording');
          setTimeout(() => {
            this.stopRecording();
            ipcRenderer.send('stopRecording');
          }, 4000);
        })
      );
    });
  }

  render() {
    return <div />;
  }
}

const mapProps = state => ({
  snippets: state.snippets,
  commands: state.commands
});

export default connect(mapProps)(Mic);

/*
    const parsedCommands = this.props.commands.map(this.parseCommand);
    return (
      <div>
        {parsedCommands.map(command => (
          <h3 key={command.join(' ')}> {command.join(' ')} </h3>
        ))}
      </div>
    );
*/
