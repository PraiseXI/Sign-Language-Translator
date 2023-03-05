function switchCamera() {
    // Get the selected camera device
    const selectedDeviceId = cameraList.value;

    // Request access to the camera device
    navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedDeviceId } })
        .then(stream => {
            inUseCamera = selectedDeviceId;
            video = createCapture({
                video: {
                    deviceId: inUseCamera
                }
            });
            video.size(640, 520);
            video.hide()
        })
        .catch(error => {
            console.error(error);
        });

    //set the inusecamera as that ID
    //load camera again
    video.load();
}

function stopCamera() {
    video.stop()
}
function playCamera() {
    video.play()
}


const stopButton = document.getElementById('stop-cam');
const playButton = document.getElementById('play-cam');
cameraList.addEventListener('change', switchCamera);
stopButton.addEventListener('click', stopCamera);
playButton.addEventListener('click', playCamera);