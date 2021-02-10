let questionListArray;
let difficultyLevel;

// getting the list of question from remote api
// and store it in a array questionListArray
function getQuestionList(difficultyLevel){
    let xhr = new XMLHttpRequest();

    xhr.open("GET" , `https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficultyLevel}&type=boolean`);
    xhr.send("POST");

    xhr.onreadystatechange = function() {
        console.log(this.readystate);
    if(this.readyState === 4 && this.status === 200) {
        questionListArray = JSON.parse(this.responseText);
        //console.log(questionListArray);
        }
    }
    return questionListArray;
}

// wait for the DOM to finish loading page

document.addEventListener("DOMContentLoaded", function() {
    let inputs = document.getElementsByTagName("input");
    console.log(inputs);

    
    for(let input of inputs) {
        input.addEventListener("click", function() {
            if (this.getAttribute("value") === "easy") {
                difficultyLevel = this.getAttribute("value");
                getQuestionList(difficultyLevel);
                alert(`You have select the ${difficultyLevel} level`);
                setTimeout(function() {
                    console.log(questionListArray);
                    }, 500);
                changeStartButtonColor();
            }else if (this.getAttribute("value") === "medium") {
                difficultyLevel = this.getAttribute("value");
                getQuestionList(difficultyLevel);
                alert(`You have select the ${difficultyLevel} level`);
                setTimeout(function() {
                    console.log(questionListArray);
                    }, 500);
                changeStartButtonColor();
            }else if (this.getAttribute("value") === "hard") {
                difficultyLevel = this.getAttribute("value");
                getQuestionList(difficultyLevel);
                alert(`You have select the ${difficultyLevel} level`);
                setTimeout(function() {
                    console.log(questionListArray);
                    }, 500);
                changeStartButtonColor();
            }else {
                alert("Incorrect value. Please select the difficulty level")
                }
            });
        }
    });

// set the background of the start button to green 
// after the selection of difficulty has been made
function changeStartButtonColor() {
    $("#start-button").css({"background-color": "#1fe24c"});

}
let button = document.getElementById("start-button");
button.addEventListener("click", runGame);

function runGame(questionListArray) {
    window.location.href = "https://8000-crimson-dog-pol18cu2.ws-eu03.gitpod.io/question-page.html";

    for(let i = 0; i < questionListArray.length; i++) {

        $("#question-number").innerHTML(`Question # ${i+1}`);
        $("#question-text").innerHTML(questionListArray[i].question).value;
    }

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

/*
// getting the list of question from remote api
// and store it in a array questionListArray
function getQuestionList(difficultyLevel){
    let xhr = new XMLHttpRequest();

    xhr.open("GET" , `https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficultyLevel}&type=boolean`);
    xhr.send("POST");

    xhr.onreadystatechange = function() {
        console.log(this.readystate);
    if(this.readyState === 4 && this.status === 200) {
        questionListArray = JSON.parse(this.responseText);
        //console.log(questionListArray);
        }
    }
    return questionListArray;
}*/
