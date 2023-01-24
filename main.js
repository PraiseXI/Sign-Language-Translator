//import { HAND_CONNECTIONS } from "../../../../../node_modules/@mediapipe/hands/index";

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

/*
const handModel = new handModel(HAND_CONNECTIONS, []);
// Define the reference dataset of hand signs
const referenceSigns = [
    { name: "sign1", embeddings: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
    { name: "sign2", embeddings: [[10, 11, 12], [13, 14, 15], [16, 17, 18]] },
    { name: "sign3", embeddings: [[19, 20, 21], [22, 23, 24], [25, 26, 27]] }
];
*/

/*
function classifyHandSign(feature_vector) {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let classifiedSign = "";
    for (let i = 0; i < referenceSigns.length; i++) {
        let currenReferenceSign = referenceSigns[i];
        for (let j = 0; j < currentReferenceSign.embeddings.length; j++) {
            let currentReferenceEmbedding = currentReferenceSign.embeddings[j];
            let distance = dtw(feature_vector, currentReferenceEmbedding);
            if (distance < minDistance) {
                minDistance = distance;
                classifiedSign = currentReferenceSign.name;
            }
        }
    }
    console.log("Detected sign: ${ classifiedSign }");
}
*/
setUp();

function setUp() {
    function getHands(results) {
        console.log(results);
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

    const camera = new Camera(videoElement, {
        onFrame: async () => {
            await hands.send({ image: videoElement });
        },
        width: 640,
        height: 480
    });
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
    hands.onResults(getHands);
    displayCameraList();
    eventListenters();
    camera.start();
    console.log("Model Loaded");
}

function eventListenters() {
    const switchButton = document.getElementById('switch-cam');
    switchButton.addEventListener('click', switchCamera);
}

function displayCameraList() {
    // Get a list of all connected devices that are webcams
    navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const webcams = devices.filter(device => device.kind === 'videoinput');

            // Display the list of webcams
            const webcamList = document.getElementById('webcam-list');
            webcams.forEach(webcam => {
                const option = document.createElement('option');
                option.value = webcam.deviceId;
                option.text = webcam.label;
                webcamList.appendChild(option);
            });

        });

    const switchButton = document.getElementById('switch-cam');
    switchButton.addEventListener('click', switchCamera);
}

function switchCamera() {
    // Get a list of available media sources.
    navigator.mediaDevices.enumerateDevices()
        .then((sources) => {
            // Filter the sources to get only the cameras.
            const cameras = sources.filter((source) => source.kind === 'videoinput');
            // Check if there is more than one camera.
            if (cameras.length > 1) {
                // Get the selected camera id from the dropdown
                const selectedCameraId = document.getElementById("webcam-list").value;
                // Get the constraints for the selected camera
                const constraints = { video: { deviceId: { exact: selectedCameraId } } };
                // Stop the current video stream
                videoElement.srcObject.getTracks().forEach(track => track.stop());
                // Get the new video stream
                navigator.mediaDevices.getUserMedia(constraints)
                    .then((stream) => {
                        videoElement.srcObject = stream;
                        videoElement.play();
                    })
                    .catch((error) => {
                        alert(`Error switching camera: ${error.message}`);
                        location.reload();
                    });
            } else {
                alert("There is only one camera available");
            }
        })
        .catch((error) => {
            alert("Error switching camera: ${ error.message }");
        });
}
/* TODO: CLASSIFYHANDSIGN FUNCTION
function classifyHandSign(feature_vector) {
    // Define the reference dataset of hand signs
    const referenceSigns = [
        { name: "sign1", embeddings: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
        { name: "sign2", embeddings: [[10, 11, 12], [13, 14, 15], [16, 17, 18]] },
        { name: "sign3", embeddings: [[19, 20, 21], [22, 23, 24], [25, 26, 27]] }
    ];

    let minDistance = Number.MAX_SAFE_INTEGER;
*/