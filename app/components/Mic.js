import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store  from '../store';
import {addOutputThunk} from '../store/decoder.js'
import electron from 'electron'
import { dictionary } from '../utils/interpreter'
import recorder from '../recorder'
import initAudio from '../audio'


class Mic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio_context: null,
      recorder: null
    }
    this.stopRecording = this.stopRecording.bind(this);
    this.blobify = this.blobify.bind(this);
  }

  blobify(blob) {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
     let base64data = reader.result.split(',')[1];
    store.dispatch(addOutputThunk(base64data))
    }
  }

  stopRecording() {
    // console.log(recorder)
    this.state.recorder.exportMonoWAV((blob) => {
      console.log(blob)
      this.blobify(blob);
    });
    this.state.recorder.stop()
    this.state.recorder.clear()
  }

  parseCommand(input){
    const words = input.split(' ')
    const parsed = words.map(word =>{
      if (dictionary[word]) return `▵${word}▵`
      else return word
    })
    return parsed
  }
  componentDidMount() {
    initAudio()
    .then(recorder => {
      this.setState({ recorder }, () => electron.remote.globalShortcut.register('Alt+z', () => {
              this.state.recorder.record()
              electron.ipcRenderer.send('startRecording')
              setTimeout(()=>{
                this.stopRecording()
                electron.ipcRenderer.send('stopRecording')
              }, 4000)
            }));
    })
  }

  render() {
      const parsedCommands = this.props.commands.map(this.parseCommand)
    return (
      <div>
        {parsedCommands.map(command => <h3 key={command.join(' ')}> {command.join(' ')} </h3>)}
      </div>
    )
  }
}

const mapProps = state => ({
  commands: state.commands
})

export default connect(mapProps)(Mic);
