export function setAudioOn() { 
    window.isPaused = false;
    visualize()
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

export function visalizerInit(){
    try{
        window.file = document.getElementById("file");
        window.audio = document.getElementById("audio");
        window.canvas = document.getElementById("canvas");

        window.canvas.width = window.innerWidth;
        window.canvas.height = window.innerHeight/ 1.5;

        window.audio.src = URL.createObjectURL(window.file.files[0]);
        window.audio.load();

        window.context = new AudioContext();
        window.audioSrc = window.context.createMediaElementSource(window.audio);
        window.analyser = window.context.createAnalyser();
        window.ctx = window.canvas.getContext('2d');

        window.audioSrc.connect(window.analyser);
        window.analyser.connect(window.context.destination);

        window.analyser.fftSize = 128;
        window.bufferLength = window.analyser.frequencyBinCount;
        window.dataArray = new Uint8Array(window.bufferLength);

        window.barWidth = window.canvas.width / window.bufferLength;

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
            renderFrame();
        }
    }
    else{
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

        var r = 25;
        var g = 25;
        var b = 25;

        if(window.color === 'red'){
            r = window.barHeight + (25 * (i/window.bufferLength));
            g = 100 * (i/window.bufferLength);
        }
        else if (window.color === 'blue'){
            b = window.barHeight + (25 * (i/window.bufferLength));
            r = 100 * (i/window.bufferLength);
        }
        else if(window.color === 'green'){
            g = window.barHeight + (25 * (i/window.bufferLength));
            b = 100 * (i/window.bufferLength);
        }

        window.ctx.fillStyle = "rgb(" + r + "," + g + "," + b +")";
        window.ctx.fillRect(x, window.canvas.height - window.barHeight, window.barWidth, window.barHeight);

        x += window.barWidth + 1;
    }
}