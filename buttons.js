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
            video.hide();
        })
        .catch(error => {
            console.error(error);
        });

    //set the inusecamera as that ID
    //load camera again
    video.load();
}

function stopCamera() {
    video.stop();
    window.location.href = 'startPage.html';
}
function playCamera() {
    video.play();
}

//eventListeners
const stopButton = document.getElementById('stop-cam');
const playButton = document.getElementById('play-cam');
cameraList.addEventListener('change', switchCamera);
stopButton.addEventListener('click', stopCamera);
playButton.addEventListener('click', playCamera);
//stop camera with space bar
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        // Create a button click event
        stopCamera();
    };
});