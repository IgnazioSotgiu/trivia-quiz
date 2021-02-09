// wait for the DOM to finish loading page

document.addEventListener("DOMContentLoaded", function() {
    let inputs = document.getElementsByTagName("input");
    console.log(inputs);

    let difficultyLevel;

    for(let input of inputs) {
        input.addEventListener("click", function() {
            if (this.getAttribute("value") === "easy") {
                difficultyLevel = this.getAttribute("value");
                getQuestionList(difficultyLevel);
                alert(`You have select the ${difficultyLevel} level`);
            }else if (this.getAttribute("value") === "medium") {
                difficultyLevel = this.getAttribute("value");
                getQuestionList(difficultyLevel);
                alert(`You have select the ${difficultyLevel} level`);
            }else if (this.getAttribute("value") === "hard") {
                difficultyLevel = this.getAttribute("value");
                getQuestionList(difficultyLevel);
                alert(`You have select the ${difficultyLevel} level`);
            }else {
                alert("Incorrect value. Please select the difficulty level")
            }
        })
    }
    // getting the list of questions from remote api
    function getQuestionList(difficultyLevel){
        let questionListArray;    

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200) {
            questionListArray = this.responseText;
            console.log(questionListArray);
            }
        }
        xhr.open("GET" , `https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficultyLevel}&type=boolean`);
        xhr.send("POST");
    }
});
function difficultyLevel() {

}

function getQuestionArray() {

}

function runGame() {

}

function diaplayQuestion() {

}

function checkAnswer() {

}

function incrementCorrect() {

}

function incrementIncorrect() {

}

function endOfTestInfo() {

}

// getting the list of question from remote api
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
        questionListArray = this.responseText;
    }
}
xhr.open("GET" , `https://opentdb.com/api.php?amount=50&category=9&difficulty=${difficultyLevel}&type=boolean`);
xhr.send("POST");