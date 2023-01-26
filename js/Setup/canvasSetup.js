let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/QQDlg-pFx/';

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
  mic = new p5.AudioIn();
  mic.start();
  getAudioContext().resume();

  createCanvas(800, 650);
  // Create the video
  video = createCapture(VIDEO);
  video.size(800, 650);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
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