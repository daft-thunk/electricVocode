
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;

/* TODO:

- offer mono option
- "Monitor input" switch
*/

function saveAudio() {
    audioRecorder.exportWAV( doneEncoding );
    // could get mono instead by saying
    // audioRecorder.exportMonoWAV( doneEncoding );
}

// function gotBuffers( buffers ) {
//     var canvas = document.getElementById( "wavedisplay" );

//     drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );

//     // the ONLY time gotBuffers is called is right after a new recording is completed -
//     // so here's where we should set up the download.
//     audioRecorder.exportWAV( doneEncoding );
// }

function doneEncoding( blob ) {
    Recorder.setupDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
    recIndex++;
}

function toggleRecording( e ) {
    if (e.classList.contains("recording")) {
        // stop recording
        audioRecorder.stop();
        e.classList.remove("recording");
        audioRecorder.getBuffers( gotBuffers );
    } else {
        // start recording
        if (!audioRecorder)
            return;
        e.classList.add("recording");
        audioRecorder.clear();
        audioRecorder.record();
    }
}

function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}

function gotStream(stream) {
    // inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    // audioInput.connect(inputPoint);
    // toggleMono()
    // // audioInput = convertToMono( audioInput );
    // console.log(audioInput)
    // var analyserNode = audioContext.createAnalyser();
    // analyserNode.fftSize = 2048;
    // inputPoint.connect( analyserNode );

    audioRecorder = new Recorder( audioInput );
    // var zeroGain = audioContext.createGain();
    // zeroGain.gain.value = 0.0;
    // inputPoint.connect( zeroGain );
    // zeroGain.connect( audioContext.destination );
    return audioRecorder
}

function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

   return navigator.mediaDevices.getUserMedia(
        {
            "audio": true
        })
        .then(stream => {
         return gotStream(stream)
        })
}

export default initAudio

