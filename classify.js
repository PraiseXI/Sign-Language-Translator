let currentLetter = [];
let sentence = [];
let words = 0;

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
}
/*
// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classify = classifier.classify(flippedVideo, (error, results) => {
        getResult(error, results);
        console.log(results[0].label);
        //currentWord = checkLetters(results[0].label);
    });
}
*/

function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
}

/*

function getResult(error, results) {
    if (error) {
        alert(error);
        console.error(error);
        location.reload();
        return;
    }
    let gotSentence = false;
    //loop for 3 words
    while (words <= 150 && gotSentence == false) {
        while (currentLetter.length < 50) {
            currentLetter.push(results[0].label);
            words++;
            classifyVideo();
            return results;
        }
        //check mostCommon letter
        let result = mostCommon(currentLetter);
        console.log("result:" + result);
        sentence.push(result);
        //reset current letter
        currentLetter = [];
        classifyVideo();
    }
    setOutputWord(sentence);
    gotSentence = true;
    sentenceComplete();
}

function mostCommon(arr) {
    let frequency = {};
    let max = 0;
    let result;

    for (let val of arr) {
        frequency[val] = frequency[val] + 1 || 1;

        if (frequency[val] > max) {
            max = frequency[val];
            result = val;
        }
    }
    return result;
}

function setOutputWord(word) {
    console.log("setting output word");
    var label = document.getElementById("letter");
    label.innerHTML = word;
    console.log(label.innerHTML);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

//TODO: REMOVE COMMAS FROM SENTENCE
//TODO: CREATE START AND STOP BUTTON THAT WORKS WITH THE SPACE BAR
//TODO: ADD FUNCTION TO PROCESS SENTENCE
//TODO: CREATE DELAY FROM WHEN STARTED TO WHEN DETECTING BUT STILL LOADING EVERYTHINg
//TODO: do not display text if it is class 7
//TODO: remove empty from sentence array

function sentenceComplete() {
    //window.location.href = "output.html";
    //go to other page
    //remove video
    //stop classification
    //display word
    //do nothing until restart button is pressed
}

*/