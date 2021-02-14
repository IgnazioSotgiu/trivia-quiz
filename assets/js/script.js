

let questionListArray;
let difficultyLevel;
let i = 0;
let totCorrect = 0;
let totIncorrect = 0;
let vote = "";


// wait for the DOM to finish loading page
// then collect the input to choose the level of difficulty

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

// after the level of difficulty has bee chosen 
// the function get ready does the 
//few more steps before the user press the start button

function getReady(difficultyLevel) {

    getQuestionArray(difficultyLevel);
    alert(`You have select the ${difficultyLevel} level`);

    setTimeout(function() {
        console.log(questionListArray);
        }, 500);
}

// passing the difficulty level to a function for 
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

// adding event listener waiting for the click of the start 
// button to execute startQuestion function
let myButton = document.getElementById("start-button");
if(myButton) {
    myButton.addEventListener("click", startQuestions);
}

// display the question on the array and creating a event listener
// for the true and false button that the user will click to 
// select the right answer

function startQuestions(event) {
    console.log(questionListArray.results.length);
    console.dir(questionListArray);
    
    if (i < questionListArray.results.length) {
        console.log(questionListArray.results[i].correct_answer);
        let correctAnswer = questionListArray.results[i].correct_answer;
        document.getElementById("replace-question-container").innerHTML =
        `<div class="question-container">
            <h2 id="question-number">Question # ${i+1}</h2>
            <hr>
            <p id="question-text">${questionListArray.results[i].question}</p>
        </div>
        <div class="user-answer-container">
            <button type="button" value="True" class="btn btn-success answer-button">True</button>
            <button type="button" value="False" class="btn btn-danger answer-button">False</button>
        </div>
        <div class="counter-container">
            <span id="correct-answers">Correct Answers</span><span id="correct-number">${totCorrect}</span><span id="incorrect-answers">Incorrect Answers</span><span id="incorrect-number">${totIncorrect}</span>
        </div>`;
        
        let buttons = document.getElementsByClassName("answer-button");
        console.log(buttons);
        
        for (let button of buttons) {
            button.addEventListener("click", function() {
                let value = this.getAttribute("value");
                console.log(value);

                if(value == correctAnswer) {
                    incrementCorrect();
                    i++;
                    alert("Congratulations! Your answer is correct");
                    startQuestions()
                } else {
                    incrementIncorrect();
                    i++;
                    alert("Arrgh.... Your answer is incorrect. Keep practicing!");
                    startQuestions();
                }
            });
        }

    } else {
        calculatePercentageCorrect();
        //console.log(typeof(result));
        giveTestEvaluation(result);
        displayEndPage(vote, result);
        
    }

}
// adding correct answer to the count
function incrementCorrect() {

    totCorrect = parseInt(document.getElementById("correct-number").innerHTML);
    document.getElementById("correct-number").innerHTML = ++totCorrect;

}
// adding incorrect answer to the count
function incrementIncorrect() {

    totIncorrect = parseInt(document.getElementById("incorrect-number").innerHTML);
    console.log(totIncorrect);
    document.getElementById("incorrect-number").innerHTML = ++totIncorrect;
    console.log(totIncorrect);

}
// calculate the percentage of correct answers
function calculatePercentageCorrect() {
    result = (totCorrect*100)/questionListArray.results.length;
    return result;
}
// Depending of the value of the variable result 
// evaluate the user performance in the test
function giveTestEvaluation(result) {

    if(result === 100) {
        vote = "You got top score... Perfect!";
    } else if (result >= 80 && result < 100) {
        vote = "Congratulation You did really good!";
    } else if (result >= 60 && result < 80) {
        vote = "Well Done! You did good";
    } else if (result >= 30 && result < 60) {
        vote = "Not Great.... Keep Practicing :)";
    } else if (result >= 0 && result < 30) {
        vote = "Arrghh... That was not good! Keep practicing!";
    } else {
        vote = "Error. Data unavailable";
    }
    return vote;
}

// Display the final screen with the results of the test

function displayEndPage() {
            document.getElementById("replace-question-container").innerHTML =

        `<div class="container-fluid message-finish-test">
            <p>You have finished the game.<br><spam id="valuation"><h2>${vote}</h2></spam></p>
            <p>Your score is:<br><span id="total-correct-answers">${totCorrect}</span> Correct answers<br><span id="final-incorrect-answers">${totIncorrect}</span> Incorrect answers</p>
            <p>You got <span id="correct-precentage">${result}</span>% of correct answers!</p>
        </div>
        <div class="end-button-container">
            <a href="index.html"><button type="button" class="btn btn-warning">Home</button></a>
        </div>`;
}
