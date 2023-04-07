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
    //loop for 4 words
    while (words <= 400 && gotSentence == false) {
         //takes 100 classifications
        while (currentLetter.length < 100) {
            //takes most confident result at [0]
            currentLetter.push(results[0].label );
            words++;
            classifyVideo();
            i++;
            return results;
        }
        //check mostCommon letter
        let result = mostCommonWord(currentLetter);
        label = "word" + i + "= " + result;

        console.log("result:" + result);
        sentence.push(result);
        //reset current letter
        currentLetter = [];
        classifyVideo();
    }
    setOutputWord(sentence);
    gotSentence = true;
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

    sentenceComplete(word);
}

function sentenceComplete(sentence) {
    video.stop();
    console.log("success, going to output page");
    localStorage.setItem('sentence', sentence);

    // ADD A PROCESSING PAGE
    window.location.href = 'output.html';
}

function cleanSentence(sentence) {
    //convert to string
    let str = sentence.toString();

    str = str.replace(/,/g, " ");
    str = str.replace(/Letter/g, "");
    str = str.replace(/Class/g, "");

    return str;

}
/*
TODO: AFTER DETECTION REMOVE ANY CLASS 7 FROM WORD - IF IT IS CLASS 7 THEN SKIP

//TODO: CREATE DELAY FROM WHEN STARTED TO WHEN DETECTING BUT STILL LOADING EVERYTHINg
//TODO: do not display text if it is class 7

*/