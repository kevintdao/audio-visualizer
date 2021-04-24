
export function recordInit(){
    const player = document.getElementById('audio');
    const handleSuccess = function(stream) {
        if (window.URL) {
            player.srcObject= stream;
        } else {
            player.src = stream;
        }
    };

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess);
}
