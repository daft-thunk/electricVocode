// import React, { Component } from 'react';

// export default class AudioRecorder extends Component {
//   constructor() {
//     super();

//     this.state = {
//       chunks: [],
//       mediaRecorder: null
//     };

//     this.startRecord = this.startRecord.bind(this);
//     this.stopRecord = this.stopRecord.bind(this);
//   }

//   componentDidMount() {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       console.log('getUserMedia supported.');
//       navigator.mediaDevices.getUserMedia(
//         // constraints - only audio needed for this app
//         {
//           audio: true
//         })

//         // Success callback
//         .then(function (stream) {
//           let mediaRecorder = new MediaRecorder(stream);
//           mediaRecorder.ondataavailable = function (e) {
//             let chunks = this.state.chunks;
//             chunks.push(e.data);
//             this.setState({ chunks });
//           };
//           this.setState({ mediaRecorder });
//         })

//         // Error callback
//         .catch(function (err) {
//           console.error('The following getUserMedia error occured: ' + err);
//         }
//         );
//     } else {
//       console.error('getUserMedia not supported on your browser!');
//     }


//   }

//   startRecord(event) {
//     event.preventDefault();
//     let mediaRecorder = this.state.mediaRecorder;
//     mediaRecorder.start();
//     this.setState({ mediaRecorder });
//   }

//   stopRecord(event) {
//     event.preventDefault();
//     let mediaRecorder = this.state.mediaRecorder;
//     mediaRecorder.stop();
//     mediaRecorder.clear();
//     this.setState({ mediaRecorder });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Yo</h1>
//         <button onClick={this.startRecord}>start</button>
//         <button onClick={this.stopRecord}>stop</button>
//       </div >
//     );
//   }
// }
