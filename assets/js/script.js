// declare variables

let questionListArray;
let difficultyLevel;
let i = 0;
let totCorrect = 0;
let totIncorrect = 0;
let vote = "";

//keep registeredUserDatabase in local storage
let registeredUserDatabase = [];
localStorage.setItem("registeredUserDatabase", JSON.stringify(registeredUserDatabase));

// wait for the DOM to finish loading page
// then collect the input to choose the level of difficulty

document.addEventListener("DOMContentLoaded", function() {
    let inputs = document.getElementsByClassName("difficulty-sel-input");
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
                alert("Incorrect value. Please select the difficulty level");
                throw "Error... Incorrect value... Aborting...";
                }
            });
        }
    });

// after the level of difficulty has bee chosen 
// the function get ready calls the get question array function
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

    xhr.open("GET" , `https://opentdb.com/api.php?amount=10&difficulty=${difficultyLevel}`);
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
    if(questionListArray) {
        
        if (i < questionListArray.results.length) {

            let correctAnswer = questionListArray.results[i].correct_answer;
            console.log(correctAnswer);
            document.getElementById("replace-question-container").innerHTML =

            `<div class="question-container">
                <h2 id="question-number">Question # ${i+1}</h2>
                <hr>
                <p id="question-text">${questionListArray.results[i].question}</p>
            </div>`
            
            if (questionListArray.results[i].type === "boolean") {
                document.getElementById("replace-question-container").innerHTML +=
                
                `<div class="user-answer-container">
                    <button type="button" value="True" class="btn btn-success boolean-answer-button">True</button>
                    <button type="button" value="False" class="btn btn-danger boolean-answer-button">False</button>
                </div>`
                
            } else if (questionListArray.results[i].type === "multiple") {

                let possibleAnswers = [questionListArray.results[i].incorrect_answers[0],questionListArray.results[i].incorrect_answers[1], questionListArray.results[i].incorrect_answers[2],questionListArray.results[i].correct_answer];
                
                shuffle(possibleAnswers);
                console.log(possibleAnswers);

                document.getElementById("replace-question-container").innerHTML +=
                `<div class="row row-center btn-answer-container">
                    <div class="col-12 col-sm-6">
                        <button class=" btn btn-secondary multiple-answer-button" id="btn-1" type="button" name="answer" value="${possibleAnswers[0]}">${possibleAnswers[0]}</button>
                    </div>
                    <div class="col-12 col-sm-6">
                        <button class="btn btn-secondary multiple-answer-button" id="btn-2" type="button" name="answer" value="${possibleAnswers[1]}">${possibleAnswers[1]}</button>
                    </div>
                    <div class="col-12 col-sm-6">
                        <button class="btn btn-secondary multiple-answer-button" id="btn-3" type="button" name="answer" value="${possibleAnswers[2]}">${possibleAnswers[2]}</button>
                    </div>
                    <div class="col-12 col-sm-6">
                        <button class="btn btn-secondary multiple-answer-button" id="btn-4" type="button" name="answer" value="${possibleAnswers[3]}">${possibleAnswers[3]}</button>
                    </div>
                </div>`
            } else {
                document.getElementById("replace-question-container").innerHTML +=
                `<div>
                <h2>Sorry ${questionListArray.results[i].type} question type not supported!</h2>
                
                </div>`
            throw "Error... Incorrect question type... Aborting...";
            }
            document.getElementById("replace-question-container").innerHTML +=
            `</div>
            <div class="counter-container">
                <span id="correct-answers">Correct Answers</span><span id="correct-number">${totCorrect}</span><span id="incorrect-answers">Incorrect Answers</span><span id="incorrect-number">${totIncorrect}</span>
            </div>`;
            
            let buttons = document.getElementsByClassName("boolean-answer-button");
            console.log(buttons);

            for (let button of buttons) {
                button.addEventListener("click", function() {
                    let value = this.getAttribute("value");
                    let btnId = this.getAttribute("id");

                    if(value == correctAnswer) {
                        incrementCorrect();
                        i++;
                        alert("Congratulations! Your answer is correct");
                        startQuestions()
                    } else {
                        incrementIncorrect();
                        i++;
                        alert(`Arrgh.... Your answer is incorrect. Keep practicing!`);
                        startQuestions();
                    }
                });
            }
            let answerButtons = document.getElementsByClassName("multiple-answer-button");
            console.log(answerButtons);
            
            for (let answerButton of answerButtons) {
                answerButton.addEventListener("click", function() {
                    let value = this.getAttribute("value");
                    let btnId = this.getAttribute("id");

                    if(value == correctAnswer) {
                        changeGreenBgColor(btnId);
                        incrementCorrect();
                        i++;
                        alert("Congratulations! Your answer is correct");
                        startQuestions();
                    } else {
                        changeRedBgColor(btnId);
                        incrementIncorrect();
                        i++;
                        alert(`Arrgh.... Your answer is incorrect. Keep practicing!`+ "\n" +`The correct answer was ${correctAnswer}`);
                        startQuestions();
                    }
                });
            }

        } else {
            calculatePercentageCorrect();
            giveTestEvaluation(result);
            displayEndPage(vote, result);
            }
    } else {
        alert("Please select the difficulty level.");
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
    document.getElementById("incorrect-number").innerHTML = ++totIncorrect;

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


// function taken from stack overflow

function shuffle(possibleAnswers) {
    var currentIndex = possibleAnswers.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = possibleAnswers[currentIndex];
        possibleAnswers[currentIndex] = possibleAnswers[randomIndex];
        possibleAnswers[randomIndex] = temporaryValue;
    }

    return possibleAnswers;
}

// Change selected button background to green if answer is correct
function changeGreenBgColor(btnId) {
    switch(btnId) {
        case btnId === "btn-1":
            $("#btn-1").css({"background-color": "#1fe24c"});
            break;
        case btnId === "btn-2":
            $("#btn-2").css({"background-color": "#1fe24c"});
            break;
        case btnId === "btn-3":
            $("#btn-3").css({"background-color": "#1fe24c"});
            break;
        case btnId === "btn-4":
            $("#btn-4").css({"background-color": "#1fe24c"});
            break;
    }
}

// Change selected button background to red if answer is incorrect
function changeRedBgColor(btnId) {
    switch(btnId) {
        case btnId === "btn-1":
            $("#btn-1").css({"background-color": "red"});
            break;
        case btnId === "btn-2":
            $("#btn-2").css({"background-color": "red"});
            break;
        case btnId === "btn-3":
            $("#btn-3").css({"background-color": "red"});
            break;
        case btnId === "btn-4":
            $("#btn-4").css({"background-color": "red"});
            break;
    }
}
/************************registration modal*************************/
let registrationLink = document.getElementById("registration-link");
let registrationModal = document.getElementById("registration-modal");
if(registrationLink) {
    registrationLink.addEventListener("click", function() {
        //console.log(modal);

        registrationModal.style.display = "block";

        window.onclick = function(event) {
        if (event.target == registrationModal) {
            registrationModal.style.display = "none";
            }
        }
    });
}

/**********************login modal******************************/
let loginLink = document.getElementById("login-link");
let loginModal = document.getElementById("login-modal");
if(loginLink) {
    loginLink.addEventListener("click", function() {
        //console.log(loginModal);

        loginModal.style.display = "block";

        window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
            }
        }
    });
}

/**********************contact modal******************************/
let contactLink = document.getElementById("contact-link");
let contactModal = document.getElementById("contact-modal");
if(contactLink) {
    contactLink.addEventListener("click", function() {
        //console.log(loginModal);

        contactModal.style.display = "block";

        window.onclick = function(event) {
        if (event.target == contactModal) {
            contactModal.style.display = "none";
            }
        }
    });
}
/*
// function to get the value from registration form
// and save them as an object into array

let registrationButton = document.getElementById("registration-button");
registrationButton.addEventListener("click", function() {
    let user = [];

    if()

    var storedUsers = JSON.parse(localStorage.getItem("registeredUserDatabase"));
    console.log(storedUsers);

    let emailCheck = document.getElementById("reg-email");
    for(let j = 0; j < storedUsers.length; j++) {
        if(storedUsers[j].email === emailCheck){
            alert("This email address has been already registered"+ '/n/'+"Thank You!");
            break;
        }
    }
    user.firstName = document.getElementById("first-name").value;
    user.lastName = document.getElementById("last-name").value;
    user.email = document.getElementById("reg-email").value;
    user.regPassword = document.getElementById("reg-password").value;
    //user.acceptAds = document.getElementById("accept-ads").value;
    console.log(user);

    registeredUserDatabase.push(user);

});*/


// choice category modal

let categoryButtons = document.getElementsByClassName("category-choice-btn");
console.log(categoryButtons);
