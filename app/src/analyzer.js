import { ledArray } from "./client";

export function setAudioOn() { 
    window.isPaused = false;
    visualize();
}

export function setAudioOff() { 
    window.isPaused = true;
    visualize();
}

export function colorRed(){
    window.color = 'red';
    if(window.file.files[0]){
        visualize();
    }
}

export function colorBlue(){
    window.color = 'blue';
    if(window.file.files[0]){
        visualize();
    }
}

export function colorGreen(){
    window.color = 'green';
    if(window.file.files[0]){
        visualize();
    }
}

export function colorInstrument(){
    window.color = 'instrument';
    if(window.file.files[0]){
        visualize();
    }
    console.log(window.instrument);
}

export function visalizerInit(){
    try{
        window.file = document.getElementById("file");
        window.audio = document.getElementById("audio");
        window.canvas = document.getElementById("canvas");

        window.isPaused = true;
        window.color = 'red';

        window.canvas.width = window.innerWidth;
        window.canvas.height = window.innerHeight/ 1.5;

        window.audio.src = URL.createObjectURL(window.file.files[0]);
        console.log(window.audio.src);
        window.audio.load();

        window.context = new AudioContext();
        window.audioSrc = window.context.createMediaElementSource(window.audio);
        window.analyser = window.context.createAnalyser();
        window.ctx = window.canvas.getContext('2d');

        window.audioSrc.connect(window.analyser);
        window.analyser.connect(window.context.destination);

        window.analyser.fftSize = 64;
        window.bufferLength = window.analyser.frequencyBinCount;
        window.dataArray = new Uint8Array(window.bufferLength);

        window.barWidth = (window.canvas.width / window.bufferLength) * 1.25;

        visualize();
        
    } catch(e){
        console.log(e);
    }
}

function visualize(){
    if(window.isPaused === true){
        if(window.dataArray.every(e => e === 0)){
            return;
        }
        else{
            sendLEDArray();
            renderFrame();
        }
    }
    else{
        sendLEDArray();
        renderFrame();
    }
}

function renderFrame(){
    window.myReq = requestAnimationFrame(visualize);
    var x = 0;
    
    window.analyser.getByteFrequencyData(window.dataArray);

    window.ctx.fillStyle = "#FFF";
    window.ctx.fillRect(0, 0, window.canvas.width, window.canvas.height);

    for(var i = 0; i < window.bufferLength; i++){
        window.barHeight = window.dataArray[i] * 2;

        var r = 50;
        var g = 50;
        var b = 50;

        if(window.color === 'red'){
            r = (window.barHeight / 2) + (25 * (i/window.bufferLength));
            g = 25 * (i/window.bufferLength);
        }
        else if (window.color === 'blue'){
            b = (window.barHeight / 2) + (10 * (i/window.bufferLength));
            r = 25 * (i/window.bufferLength);
        }
        else if(window.color === 'green'){
            g = (window.barHeight / 2.5) + (20 * (i/window.bufferLength));
            b = 25 * (i/window.bufferLength);
        }
        else if(window.color === 'instrument'){
            if(window.instrument === 'Guitar'){
                //orange
                r = (window.barHeight / 2) + (10 * (i/window.bufferLength));
                g = (window.barHeight / 4) + (5 * (i/window.bufferLength));
                b = 0;
            }
            else if(window.instrument === 'Piano'){
                // purple
                r = (window.barHeight / 2) + (5 * (i/window.bufferLength));
                g = 0;
                b = (window.barHeight / 2) + (10 * (i/window.bufferLength));
            }
            else if(window.instrument === 'Trumpet'){
                // yellow
                r = (window.barHeight / 2) + (10 * (i/window.bufferLength));
                g = (window.barHeight / 2) + (10 * (i/window.bufferLength));
                b = 10 * (i/window.bufferLength);
            }
            else if(window.instrument === 'Violin'){
                // cyan
                r = 0;
                g = (window.barHeight / 2) + (5 * (i/window.bufferLength));
                b = (window.barHeight / 2) + (5 * (i/window.bufferLength));
            }
            else{
                // default
                r = (window.barHeight / 2) + (3 * (i/window.bufferLength));
                g = 0;
                b = 0;
            }
        }

        window.ctx.fillStyle = "rgb(" + r + "," + g + "," + b +")";
        window.ctx.fillRect(x, window.canvas.height - window.barHeight, window.barWidth-1, window.barHeight);

        x += window.barWidth + 1;
    }
}

function sendLEDArray() {
    ledArray(window.dataArray, window.color, window.instrument);
}

export function visalizerInitForRecord(){
    try{
        var aud = sessionStorage.getItem('file');
        window.canvas = document.getElementById("canvas");

        window.isPaused = true;
        window.color = 'red';
        window.interval = null;

        window.canvas.width = window.innerWidth;
        window.canvas.height = window.innerHeight/ 1.5;

        console.log(aud);

        window.audio.src = aud;
        window.audio.load();

        window.context = new AudioContext();
        window.audioSrc = window.context.createMediaElementSource(window.audio);

        window.analyser = window.context.createAnalyser();
        window.ctx = window.canvas.getContext('2d');

        window.audioSrc.connect(window.analyser);
        window.analyser.connect(window.context.destination);

        window.analyser.fftSize = 64;
        window.bufferLength = window.analyser.frequencyBinCount;
        window.dataArray = new Uint8Array(window.bufferLength);

        window.barWidth = (window.canvas.width / window.bufferLength) * 1.25;

        visualize();
        
    } catch(e){
        console.log(e);
    }
}