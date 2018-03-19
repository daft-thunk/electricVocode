import React, { Component } from 'react';
import { connect } from 'react-redux';
import Recorder from '../../public/recorder.js';
import axios from 'axios';
import store, { addOutputThunk } from '../store';

export default class Mic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      audio_context: null,
      recorder: null
    }
    this.startUserMedia = this.startUserMedia.bind(this);
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
    this.state.recorder.exportWAV((blob) => {
      // console.log(blob)
      this.blobify(blob);
    });
    this.state.recorder.stop()
    this.state.recorder.clear()
  }

  startUserMedia(stream) {
    let input = this.state.audio_context.createMediaStreamSource(stream);

    this.setState({recorder: new Recorder(input)});
  }

  componentDidMount() {
    try {
      // webkit shim
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      this.setState({audio_context: new AudioContext}, () => {
        navigator.getUserMedia({audio: true}, this.startUserMedia, function(e) {
          // __log('No live audio input: ' + e);
        });
      })
      //__log('Audio context set up.');
      //__log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
      alert('No web audio support in this browser!');
    }

  }

  render() {
    console.log(this.state.recorder);
    return (
      <div>
        <h1>Hello Mic</h1>
        <button onClick={() => this.state.recorder.record()}>Start</button>
        <button onClick={() => this.stopRecording()}>Stop</button>
      </div>
    )
  }
}
