async function requestCameraPermission() {
    // Prompt the user to select a camera from the list
    alert('Please select your camera from the dropdown list.');
    const permissionStatus = await navigator.permissions.query({ name: 'camera' });
    if (permissionStatus.state === 'granted') {
        // Permission already granted, proceed with displaying the camera stream
        displayCameraList();
    } else if (permissionStatus.state === 'prompt') {
        // Permission not yet granted, show the permission prompt and wait for the user's response
        const permissionResult = await navigator.permissions.request({ name: 'camera' });
        if (permissionResult.state === 'granted') {
            // Permission granted, proceed with displaying the camera stream
            displayCameraList();
            displayVideoStream();
        } else {
            // Permission denied, show an error message
            alert('You must grant camera permission in order to use this app.');
        }
    } else {
        // Permission denied, show an error message
        alert('You must grant camera permission in order to use this app.');
    }
}
export function displayCameraList() {
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
    storeCurrentCamera(selectedDeviceId);
}
function storeCurrentCamera(currentCam) {
    localStorage.setItem('cam-ID', currentCam);
}
requestCameraPermission();

const webcamList = document.getElementById('webcam-list');
webcamList.addEventListener('change', displayVideoStream);
