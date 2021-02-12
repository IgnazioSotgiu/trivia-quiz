let questionListArray;
let difficultyLevel;
let i = 0;
let totCorrect = 0;
let totIncorrect = 0;
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
    myButton.addEventListener("click", startQuestions);
}

function startQuestions(event) {
    console.log(questionListArray.results.length);
    console.dir(questionListArray);
     
    if (i < questionListArray.results.length) {
        document.getElementById("replace-question-container").innerHTML =

            `<div class="question-container">
                <h2 id="question-number">Question # ${i+1}</h2>
                <hr>
                <p id="question-text">${questionListArray.results[i].question}</p>
            </div>
            <div class="user-answer-container">
                <button type="button" value="True" class="btn btn-success answer-button">True</button>
                <button type="button" value="False " class="btn btn-danger answer-button">False</button>
            </div>
            <div class="counter-container">
                <span id="correct-answers">Correct Answers</span><span id="correct-number">${totCorrect}</span><span id="incorrect-answers">Incorrect Answers</span><span id="incorrect-number">${totIncorrect}</span>
            </div>
        </div>`;


        let buttons = document.getElementsByClassName("answer-button");

        for (let button of buttons) {
            button.addEventListener("click", function() {
            if(this.getAttribute("value") == "questionListArray.results[i].correct_answer") {
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

    }

}

function incrementCorrect() {

    let totCorrect = parseInt(document.getElementById("correct-number").innerText);
    document.getElementById("correct-number").innerText = ++totCorrect;

}

function incrementIncorrect() {

    totIncorrect = parseInt(document.getElementById("incorrect-number").innerHTML);
    console.log(totIncorrect);
    document.getElementById("incorrect-number").innerHTML = ++totIncorrect;
    console.log(totIncorrect);

}

function endOfTestInfo() {

}
