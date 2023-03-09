let currentLetter = [];
let sentence = [];
let words = 0;
let i = 0;
const result = document.getElementById("result");

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, getResult);
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
/*
function getResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        video.stop()
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
}
*/

function getResult(error, results) {
    if (error) {
        alert(error);
        console.error(error);
        video.stop();
    }
    let gotSentence = false;
    //loop for 3 words
    while (words <= 500 && gotSentence == false) {
        while (currentLetter.length < 100 /*takes 100 classifications*/) {
            //console.log(currentLetter)
            //console.log(results)
            currentLetter.push(results[0].label /*takes most confident one with is [0]*/);
            words++;
            classifyVideo();
            i++;
            return results;
        }
        //check mostCommon letter
        let result = mostCommonWord(currentLetter);
        label = "word" + i + "= " + result;

        // TODO: SORT OUT NUMBER i label = "word " + i + " = " + result
        //TODO: refactor result to make into proper sentence
        console.log("result:" + result);
        sentence.push(result);
        //reset current letter
        currentLetter = [];
        classifyVideo();
    }
    setOutputWord(sentence);
    gotSentence = true;
    sentenceComplete();

    //TODO: do something for complete sentence - confirm page?
}

function mostCommonWord(arr) {
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
    console.log("the most common letter is: " + result);
    return result;
}

function setOutputWord(word) {

    console.log("cleaning sentence")
    word = cleanSentence(word);

    console.log("setting output word");

    result.innerHTML = "The sentence that was translated is: " + word;
    console.log(result.innerHTML);
}

function sentenceComplete() {
    video.stop();
    console.log("success");
    //remove video
    //stop classification
    //display word
    //do nothing until restart button is pressed
}

function cleanSentence(sentence) {
    //convert to string
    let str = sentence.toString();

    str = str.replace(/,/g, " ");
    str = str.replace(/Letter/g, "");

    return str;

}
/*
TODO: AFTER DETECTION REMOVE ANY CLASS 7 FROM WORD - IF IT IS CLASS 7 THEN SKIP
//TODO: DISPLAY CURENT WORD ON SCREEN -> THEN DISPLAY SENTENCE
//TODO: Add a retry button
//TODO: CREATE CREATE A NEW AGE FOR OUTPUT

//TODO: CREATE START AND STOP BUTTON THAT WORKS WITH THE SPACE BAR
//TODO: ADD FUNCTION TO PROCESS SENTENCE
//TODO: CREATE DELAY FROM WHEN STARTED TO WHEN DETECTING BUT STILL LOADING EVERYTHINg
//TODO: do not display text if it is class 7
//TODO: remove empty from sentence array



*/