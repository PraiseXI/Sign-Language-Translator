const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                { color: '#00FF00', lineWidth: 5 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
        }
    }
    canvasCtx.restore();
}

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.75,
    minTrackingConfidence: 0.75
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 500,
    height: 500
});
function showCameraInfo() {
    // Get a list of available media sources.
    navigator.mediaDevices.enumerateDevices()
        .then((sources) => {
            // Filter the sources to get only the cameras.
            const cameras = sources.filter((source) => source.kind === 'videoinput');
            // Output the number of cameras on screen.
            document.getElementById('num-cameras').innerHTML = `Number of cameras: ${cameras.length}`;
            // Get the current deviceId of the video element.
            const currentDeviceId = videoElement.getAttribute('data-device-id');
            // Output the current camera name on screen.
            document.getElementById('current-camera').innerHTML = `Current camera: ${currentDeviceId}`;

            let otherCameras = '';
            if (cameras.length === 1) {
                otherCameras = 'Other cameras: None';
            } else {
                otherCameras = 'Other cameras:';
                cameras.forEach((camera) => {
                    if (camera.deviceId !== currentDeviceId) {
                        otherCameras += `     ${camera.deviceId}     `;
                    }
                });
            }
            document.getElementById('other-cameras').innerHTML = otherCameras;
        })
        .catch((error) => {
            console.error(error);
        });
}


document.getElementById('show-caminfo-button').addEventListener('click', showCameraInfo);



function switchCamera() {
    // Get a list of available media sources.
    navigator.mediaDevices.enumerateDevices()
        .then((sources) => {
            // Filter the sources to get only the cameras.
            const cameras = sources.filter((source) => source.kind === 'videoinput');
  
            // Check if there is more than one camera.
            if (cameras.length > 1) {
                // Get the current deviceId of the video element.
                const currentDeviceId = videoElement.getAttribute('data-device-id');
                // Output the current camera name on screen.
                document.getElementById('current-camera').innerHTML = `Current camera: ${currentDeviceId}`;
  
                // Find the index of the current camera in the list of cameras.
                const currentIndex = cameras.findIndex((camera) => camera.deviceId === currentDeviceId);
                // Get the next camera in the list.
                const nextCamera = cameras[(currentIndex + 1) % cameras.length];
                // Set the deviceId of the video element to the next camera.
                videoElement.setAttribute('data-device-id', nextCamera.deviceId);
                // Restart the camera with the new deviceId.
                camera.stop();
                camera.start();
            } else if (cameras.length === 1) {
                alert("There is only one camera detected.");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}



// Add an event listener to the button to switch the camera when the button is clicked.
const switchCamButton = document.getElementById('switch-camera-button');
//const showCamInfo = document.getElementById('show-caminfo-button');
switchCamButton.addEventListener('click', switchCamera);
//showCamInfo.addEventListener('click', displayCameraInfo);


camera.start();