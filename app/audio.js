
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;


function saveAudio() {
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
    Recorder.setupDownload( blob, 'myRecording' + ((recIndex < 10) ? '0':'') + recIndex + '.wav' );
    recIndex++;
}

function toggleRecording( e ) {
    if (e.classList.contains('recording')) {
        // stop recording
        audioRecorder.stop();
        e.classList.remove('recording');
        audioRecorder.getBuffers( gotBuffers );
    } else {
        // start recording
        if (!audioRecorder) {return;}
        e.classList.add('recording');
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
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioRecorder = new Recorder( audioInput );
    return audioRecorder;
}

function initAudio() {
        if (!navigator.getUserMedia) {navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;}
        if (!navigator.cancelAnimationFrame) {navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;}
        if (!navigator.requestAnimationFrame) {navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;}

   return navigator.mediaDevices.getUserMedia(
        {
            'audio': true
        })
        .then(stream => {
         return gotStream(stream);
        });
}

export default initAudio;

