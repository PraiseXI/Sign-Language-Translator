let classifier;
// initialisers
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/QQDlg-pFx/';
const currentCameraID = localStorage.getItem('cam-ID');
let inUseCamera = "";
const cameraList = document.getElementById('webcam-list');

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
    inUseCamera = currentCameraID;
    load();
    createCanvas(640, 520);
    // Create the video to option passsed from start page
    video = createCapture({
        video: {
            deviceId: inUseCamera
        }
    });
    video.size(640, 520);
    video.hide();

    flippedVideo = ml5.flipImage(video);

    classifyVideo();
}

function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(50);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
}

async function load() {
    requestCameraPermission();

}

async function displayCameraList() {
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
    //TODO: SET ACTIVE OPTION 
    let currentCamera = await getDeviceByID(cameraList, currentCameraID);
    console.log("successfully returned videoDevice: " + currentCamera.label);
    setSelectedOption(cameraList, currentCamera.label);
}

function getDeviceByID(selectElement, deviceId) {
    return navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const videoDevice = devices.find(device => device.kind === 'videoinput' && device.deviceId === deviceId);
            console.log("successfully recieved videoDevice: " + videoDevice.label);
            return videoDevice;
        })
        .catch(error => {
            console.error('Failed to enumerate devices:', error);
        });
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

function setSelectedOption(selectList, value) {
    const options = selectList.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].label === value) {
            selectList.selectedIndex = i;
            break;
        }
    }
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

async function requestCameraPermission() {
    const permissionStatus = await navigator.permissions.query({ name: 'camera' });
    if (permissionStatus.state === 'granted') {
        // Permission already granted, proceed with displaying the camera stream
        displayCameraList();
    } else if (permissionStatus.state === 'prompt') {
        // Permission not yet granted, show the permission prompt and wait for the user's response
        const permissionResult = await navigator.permissions.query({ name: 'camera' });
        if (permissionResult.state === 'granted') {
            // Permission granted, proceed with displaying the camera stream
            displayCameraList();
        } else {
            // Permission denied, show an error message
            alert('You must grant camera permission in order to use this app.');
        }
    } else {
        // Permission denied, show an error message
        alert('You must grant camera permission in order to use this app.');
        //TODO: ERROR HELP Page
    }
}

function test() {
    alert(cameraList.value);
    //TODO: REMOVE
}
