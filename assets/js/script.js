let questionListArray;
let difficultyLevel;

// wait for the DOM to finish loading page

document.addEventListener("DOMContentLoaded", function() {
    let inputs = document.getElementsByTagName("input");
    console.log(inputs);

    for(let input of inputs) {
        input.addEventListener("click", function() {
            if (this.getAttribute("value") === "easy") {
                difficultyLevel = this.getAttribute("value");
                getReady(difficultyLevel);

            }else if (this.getAttribute("value") === "medium") {
                difficultyLevel = this.getAttribute("value");
                getReady(difficultyLevel);

            }else if (this.getAttribute("value") === "hard") {
                difficultyLevel = this.getAttribute("value");
                getReady(difficultyLevel);

            }else {
                alert("Incorrect value. Please select the difficulty level")
                }
            });
        }
    });

// getting the list of question from remote api
// and store it in a array questionListArray
function getQuestionArray(difficultyLevel){
    let xhr = new XMLHttpRequest();

    xhr.open("GET" , `https://opentdb.com/api.php?amount=10&category=9&difficulty=${difficultyLevel}&type=boolean`);
    xhr.send("POST");

    xhr.onreadystatechange = function() {
        
    if(this.readyState === 4 && this.status === 200) {
        questionListArray = JSON.parse(this.responseText);
        $("#start-button").css({"background-color": "#1fe24c"});

        }
    }
    return questionListArray;
}


//after the selection the function get ready will prepare the game
//waiting for the user to click start

function getReady(difficultyLevel) {

    getQuestionArray(difficultyLevel);
    alert(`You have select the ${difficultyLevel} level`);

    setTimeout(function() {
        console.log(questionListArray);
        }, 500);

    //$(".start-button-container a[href]").attr("href" , "question-page.html");
    
}


let myButton = document.getElementById("start-button");
if(myButton) {
    myButton.addEventListener("click", startQuestions(questionListArray));
}

function startQuestions(questionListArray) {
    console.log(questionListArray);
    for(let i = 0; i < questionListArray.length; i++) {

        //$("#question-number").innerHTML(`Question # ${i+1}`);
        //$("#question-text").innerHTML(questionListArray[i].question).value;
        let newQuestion = 
            `<div class="question-container">
            <h2 id="question-number">Question # ${i+1}</h2>
            <hr>
            <p id="question-text">${this.questionListArray}</p>
        </div>`
    }

}
function checkAnswer() {

}

function incrementCorrect() {

}

function incrementIncorrect() {

}

function endOfTestInfo() {

}
