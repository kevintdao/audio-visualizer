export function visualize() {
    var file = document.getElementById("file");
    var audio = document.getElementById("audio");
    var canvas = document.getElementById("canvas");

    audio.src = URL.createObjectURL(file.files[0]);
    audio.load();
    audio.play();

    var context = new AudioContext();
    var src;
    try{
        src = context.createMediaElementSource(audio);
    } catch(e){
        console.log(e);
    }
    var analyser = context.createAnalyser();
    var ctx = canvas.getContext('2d');

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    var barWidth = (canvas.width / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame(){
        requestAnimationFrame(renderFrame);
        x = 0;
        
        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for(var i = 0; i < bufferLength; i++){
            barHeight = dataArray[i];

            var r = barHeight + (25 * (i/bufferLength));
            var g = 250 * (i/bufferLength);
            var b = 50;

            ctx.fillStyle = "rgb(" + r + "," + g + "," + b +")";
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    renderFrame();
}

