import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";

const URL = "https://teachablemachine.withgoogle.com/models/s21NSxUNR/";

export async function createModel() {
    const checkpointURL = URL + "model.json"; // model topology
    const metadataURL = URL + "metadata.json"; // model metadata

    const recognizer = speech.create(
        "BROWSER_FFT", // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        checkpointURL,
        metadataURL);

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    return recognizer;
}


export function listen() {
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
    }, {
        includeSpectrogram: true, // in case listen should return result.spectrogram
        probabilityThreshold: 0.75,
        invokeCallbackOnNoiseAndUnknown: true,
        overlapFactor: 0.50 // probably want between 0.5 and 0.75. More info in README
    });
}

export function stop() {
    if(window.isListening === true){
        window.recognizer.stopListening();
        window.isListening = false;
    }

    for (let i = 0; i < window.classLabels.length + 1; i++) {
        if(i < window.classLabels.length){
            window.labelContainer.childNodes[i].innerHTML = window.classLabels[i] + ": 0%";
        }
        else{
            window.labelContainer.childNodes[i].innerHTML = "Current: ";
        }
    }
}