let currentLetter = [];
// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classify = classifier.classify(flippedVideo, (error, results) => {
        getResult(error, results);
        console.log(results[0].label);
        //currentWord = checkLetters(results[0].label);
    });
}


function getResult(error, results) {
    if (error) {
        alert(error);
        console.error(error);
        location.reload();
        return;
    }
    while (currentLetter.length < 50) {
        currentLetter.push(results[0].label);
        classifyVideo();
        return results;
    }

    try {
        //check mostCommon letter
        let result = mostCommon(currentLetter);
        console.log("result:" + result)
        setOutputWord(result)
        currentLetter = [];
        return results;
    }
    catch (error) {
        console.log(error);
    }

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
    console.log("setting output word")
    var label = document.getElementById("letter");
    label.innerHTML = word;
    console.log("label.innerHTML")
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

//TODO: MAKE LOOP AGAIN TO DETECT WORD
//TODO: CREATE A NEW SENTENCE ARRAY
//TODO: OUTPUT SENTENCE 
//TODO: CREATE START AND STOP BUTTON THAT WORKS WITH THE SPACE BAR
//TODO: CREATE DELAY FROM WHEN STARTED TO WHEN DETECTING BUT STILL LOADING EVERYTHINg
//TODO: do not display text if it is class 7
//TODO: remove empty from sentence array