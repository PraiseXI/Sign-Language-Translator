const output = document.getElementById("translation");
const sentence = localStorage.getItem('sentence');

function restart() {
    window.location.href = 'startPage.html';
}
function setTranslation() {
    output.innerHTML = sentence;
}

setTranslation();
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restart);

//TODO: DO IT IN DIFFERENT LANGUAGES AND SPEECH
//TODO: TALKING PERSON?