// import * as tf from "@tensorflow/tfjs";
// import * as speech from "@tensorflow-models/speech-commands";

// const URL = "https://teachablemachine.withgoogle.com/models/s21NSxUNR/";

// export async function createModel() {
//     const checkpointURL = URL + "model.json"; // model topology
//     const metadataURL = URL + "metadata.json"; // model metadata

//     const recognizer = speech.create(
//         "BROWSER_FFT", // fourier transform type, not useful to change
//         undefined, // speech commands vocabulary feature, not useful for your models
//         checkpointURL,
//         metadataURL);

//     // check that model and metadata are loaded via HTTPS requests.
//     await recognizer.ensureModelLoaded();

//     return recognizer;
// }


<<<<<<< HEAD
// export function listen() {
//     window.recognizer.listen(result => {
//         const scores = result.scores; // probability of prediction for each class
//         // render the probability scores per class
//         var max = 0;
//         var maxIndex = 0;
//         window.isListening = true;
//         for (let i = 0; i < window.classLabels.length + 1; i++) {
//             if(i < window.classLabels.length){
//                 const classPrediction = window.classLabels[i] + ": " + (scores[i] * 100).toFixed(0) + " %";
//                 window.labelContainer.childNodes[i].innerHTML = classPrediction;
//                 if(scores[i] > max){
//                     max = scores[i];
//                     maxIndex = i;
//                 }
//             }
//             else{
//                 window.labelContainer.childNodes[i].innerHTML = "Current: " + window.classLabels[maxIndex];
//             }
//         }
//     }, {
//         includeSpectrogram: true, // in case listen should return result.spectrogram
//         probabilityThreshold: 0.75,
//         invokeCallbackOnNoiseAndUnknown: true,
//         overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
//     });
// }
=======
export function listen() {
    window.audioIntruments = [0, 0, 0, 0];

    window.recognizer.listen(result => {
        const scores = result.scores; // probability of prediction for each class
        // render the probability scores per class
        var max = 0;
        var maxIndex = 0;
        window.isListening = true;
        for (let i = 0; i < window.classLabels.length + 1; i++) {
            if(i < window.classLabels.length){
                const classPrediction = window.classLabels[i] + ": " + (scores[i] * 100).toFixed(0) + " %";
                window.labelContainer.childNodes[i].innerHTML = classPrediction;
                if(scores[i] > max){
                    max = scores[i];
                    maxIndex = i;
                }
            }
            else{
                window.labelContainer.childNodes[i].innerHTML = "Current: " + window.classLabels[maxIndex];
            }
        }
        // increment the current instrument
        window.audioIntruments[maxIndex - 1]++;
        console.log(window.audioIntruments);
    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });
}
>>>>>>> origin/socketio

// export function stop() {
//     if(window.isListening === true){
//         window.recognizer.stopListening();
//         window.isListening = false;
//     }

<<<<<<< HEAD
//     for (let i = 0; i < window.classLabels.length + 1; i++) {
//         if(i < window.classLabels.length){
//             window.labelContainer.childNodes[i].innerHTML = window.classLabels[i] + ": 0%";
//         }
//         else{
//             window.labelContainer.childNodes[i].innerHTML = "Current: ";
//         }
//     }
// }
=======
    // get the most played instrument in the recording
    var max = 0;
    var maxIndex = 0;
    for(let i = 0; i < window.audioIntruments.length; i++){
        if(window.audioIntruments[i] > max){
            max = window.audioIntruments[i];
            maxIndex = i;
        }
    }

    window.instrument = window.classLabels[maxIndex + 1];

    console.log(window.instrument);

    for (let i = 0; i < window.classLabels.length + 2; i++) {
        if(i < window.classLabels.length){
            window.labelContainer.childNodes[i].innerHTML = window.classLabels[i] + ": 0%";
        }
        else if(i === window.classLabels.length){
            window.labelContainer.childNodes[i].innerHTML = "Current: ";
          }
          else{
            window.labelContainer.childNodes[i].innerHTML = "Most played: " + window.instrument;
          }
    }
}
>>>>>>> origin/socketio
