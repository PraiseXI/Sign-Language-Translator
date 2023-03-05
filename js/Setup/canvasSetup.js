async function start() {
    //TODO: add a loading transition until these setups have been done

    displayCameraList()
    //PASS IN CAMERA ID AND SET TO ACTIVE CAM
    const currVideo = document.getElementById('video-element');
    const currentCameraID = localStorage.getItem('cam-ID');
    let currentCamera = await getDeviceByID(currentCameraID);
    const cameraList = document.getElementById('webcam-list');
    stopRunningVideoStreams();
    setSelectedOption(cameraList, currentCamera.label);
    setExistingVideoStream(currentCameraID, currVideo);

    cameraList.addEventListener('change', displayVideoStream);
}

function stopRunningVideoStreams() {
    // to shut all the open or running video streams
    if (window.videoStream !== null && window.videoStream !== undefined && window.videoStream.length > 0 &&
        video) {
        window.videoStream.forEach((stream) => {
            if (stream) {
                if ('getTracks' in stream && stream.getTracks().length > 0) {
                    stream.getTracks().forEach((track) => stopTrack(track));
                }
                if ('getVideoTracks' in stream && stream.getVideoTracks().length > 0) {
                    stream.getVideoTracks().forEach((track) => stopTrack(track));
                }
                if ('getAudioTracks' in stream && stream.getAudioTracks().length > 0) {
                    stream.getAudioTracks().forEach((track) => stopTrack(track));
                }
            }
        });
        window.videoStream = [];
        video.srcObject = null;
    }
}

function setExistingVideoStream(deviceID, currVideo) {
    //create video with existing deviceID
    navigator.mediaDevices.getUserMedia({
        video: {
            deviceId: { exact: deviceID }
        }
    }).then(stream => {
        currVideo.srcObject = stream;
        currVideo.play();
    }).catch(error => {
        console.error(error);
    });

    document.body.appendChild(currVideo);
}

async function getDeviceByID(deviceId) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevice = devices.find(device => device.kind === 'videoinput' && device.deviceId === deviceId);

    return videoDevice;
}

function setSelectedOption(selectList, value) {
    const options = selectList.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].label === value) {
            selectList.selectedIndex = i;
            break;
        }
    }
}

function clearSelectList(List) {
    while (selectElement.options.length > 0) {
        selectElement.remove(0);
      }
}

function displayCameraList() {
    // Get a list of all connected devices that are webcams
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const webcams = devices.filter(device => device.kind === 'videoinput');

            // Display the list of webcams
            const webcamList = document.getElementById('webcam-list');
            webcams.forEach(webcams => {
                const option = document.createElement('option');
                option.value = webcams.deviceId;
                option.text = webcams.label;
                webcamList.appendChild(option);
            });

        });
}

export function displayVideoStream() {
    // Get the selected camera device
    const selectedDeviceId = document.getElementById('webcam-list').value;

    // Request access to the camera device
    navigator.mediaDevices.getUserMedia({ video: { deviceId: selectedDeviceId } })
        .then(stream => {
            // Get the video element
            const videoElement = document.getElementById('video-element');

            // Display the video stream in the video element
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch(error => {
            console.error(error);
        });
}

start();