// declare global variables
let questionListArray = [];
let chosenCategory = "";
let difficultyLevel = "";
let i = 0;
let totCorrect = 0;
let totIncorrect = 0;
let vote = "";
let overallCorrect = 0;
let overallIncorrect = 0;
let overallQuestions = 0;
let questionRound = 2;
// wait for the DOM to finish loading page
//add event listeners for the category choice, the level 
// of difficulty, and the start button.
document.addEventListener("DOMContentLoaded", function() {
    logoAnimation();
    startPage();
});
function logoAnimation(){
    let mainLogo = document.getElementById("logo");
    let mainLogoRight = document.getElementById("logo-right");
    mainLogo.style.left = "50%";
    mainLogoRight.style.right = "50%";

    mainLogo.style.transform = "translate(-50%)";
    mainLogoRight.style.transform = "translate(50%)";
}
/****************function start page*************** */
function startPage() {
    let startGameButton = document.getElementById("start-game-button");
    startGameButton.addEventListener("click", selectCategory);
}
//***************category selection function************************* */
function selectCategory() {
    let categoryChoiceModal = document.getElementById("category-choice-modal");
    categoryChoiceModal.style.display = "block";
    let categories = document.getElementsByClassName("category-choice-btn");
    window.onclick = function(event) {
        if (event.target == categoryChoiceModal) {
            categoryChoiceModal.style.display = "none";
            }
        };
    for(let category of categories) {
        category.addEventListener("click", function() {
            switch(this.getAttribute("value")) {
                case "general":
                    chosenCategory = "9";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "book":
                    chosenCategory = "10";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "film":
                    chosenCategory = "11";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "music":
                    chosenCategory = "12";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "tv":
                    chosenCategory = "14";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "video-games":
                    chosenCategory = "15";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "computer":
                    chosenCategory = "18";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "math":
                    chosenCategory = "19";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "sport":
                    chosenCategory = "21";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "geography":
                    chosenCategory = "22";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "history":
                    chosenCategory = "23";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                case "animals":
                    chosenCategory = "27";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                        selectDifficultyLevel(chosenCategory);
                    },500);
                    break;
                default:
                    alert("Error! Choice not recognized");
                    throw ("Error! Choice not recognized... Aborting..");
            }
        });
    }
    return difficultyLevel;
    return chosenCategory
}

/******************************difficulty level selection function************** */
function selectDifficultyLevel() {
    let difficultyChoiceModal = document.getElementById("difficulty-choice-modal");
    difficultyChoiceModal.style.display = "block";
    let difficulties = document.getElementsByClassName("difficulty-sel-input");
    window.onclick = function(event) {
        if (event.target == difficultyChoiceModal) {
            difficultyChoiceModal.style.display = "none";
            }
        }
    for(let difficulty of difficulties) {
        difficulty.addEventListener("click", function() {
            switch(this.getAttribute("value")) {
                case "easy":
                difficultyLevel = this.getAttribute("value");
                setTimeout(function(){
                    difficultyChoiceModal.style.display = "none";
                },500);
                break;

                case "medium":
                difficultyLevel = this.getAttribute("value");
                setTimeout(function(){
                    difficultyChoiceModal.style.display = "none";
                },1000);
                break;

                case "hard":
                difficultyLevel = this.getAttribute("value");
                setTimeout(function(){
                    difficultyChoiceModal.style.display = "none";
                },1000);
                break;
            }
        showCountdown(chosenCategory, difficultyLevel);
        });
    }
    return difficultyLevel;
}
/**********************Create start button after the category and level selection ****** */
function showCountdown(chosenCategory, difficultyLevel) {
    getQuestionArray(chosenCategory, difficultyLevel);

    let messageHomepage = document.getElementById("message-homepage");
    messageHomepage.style.display = "none";
    
    let goButtonSection = document.getElementById("go-button-section");
    goButtonSection.style.display = "none";

    let countdownSection = document.getElementById("countdown-section");
    countdownSection.style.display = "flex";
    countdown();
}
//***************************countdown sequence*********************** */
function countdown() {
    let timeLeftDisplay = document.getElementById("time-left");
    let timeLeft = 3;

    setInterval(function() {
        if(timeLeft <= 0) {
            clearInterval(timeLeft = 0);
        }
        timeLeftDisplay.innerHTML = timeLeft;
        timeLeft -= 1;
    }, 1000);
    setTimeout(function() {
        startQuestions()
    }, 3800);

}
// passing the difficulty level to a function for 
// getting the list of question from remote api
// and store it in a array questionListArray
function getQuestionArray(chosenCategory, difficultyLevel){
    let xhr = new XMLHttpRequest();
    let amountQuestions;
    console.log(typeof(difficultyLevel));
    if(difficultyLevel === "easy") {
        amountQuestions = "10";
    } else if(difficultyLevel === "medium") {
        amountQuestions = "13";
    } else if(difficultyLevel === "hard") {
        amountQuestions = "15";
    } else{
        console.log("Error. Difficulty choice not recognized");
        throw("Error. Difficulty choice not recognized. Aborting....");
    }
    xhr.open("GET" , `https://opentdb.com/api.php?amount=${amountQuestions}&category=${chosenCategory}&difficulty=${difficultyLevel}`);
    xhr.send("POST");
    xhr.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
        questionListArray = JSON.parse(this.responseText);
        $("#start-button").css({"background-color": "#1fe24c"});
        }
    };
    return questionListArray;
}
// display the question on the array and creating a event listener
// for the true and false button that the user will click to 
// select the right answer
function startQuestions(event) {
    if (i < questionListArray.results.length) {
        let correctAnswer = questionListArray.results[i].correct_answer;
        displayQuestion();
            if (questionListArray.results[i].type === "boolean") {
                displayBooleanAnswerButtons();
            } else if (questionListArray.results[i].type === "multiple") {
                displayMultipleChoiceAnswerButtons();
            } else {
                incorrectQuestionTypeMessage();
            }
        displayCorrectIncorrectCounter();
        checkBooleanAnswer(correctAnswer);
        checkMultipleChoiceAnswer(correctAnswer);
    } else {  
        calculatePercentageCorrect();
        overallPercentageCorrect();
        giveTestEvaluation(result);
        displayEndPage(vote, result, overallResult);
        let continueButton = document.getElementById("continue-button");
        continueButton.addEventListener("click", continueGame);
    }
}
/*****************function correct answer*************** */
function answerIsCorrect() {
    incrementCorrect();
    overallCorrect++;
    i++;
    $(".swal-button, .swal-overlay").css("display", "block");
    swal({
        title: "Good job!",
        icon: "success",
        button: "OK",
    });
    setTimeout(function(){
        $(".swal-button, .swal-overlay").css("display", "none");
        startQuestions();
    }, 1000);
}
/*****************function incorrect boolean answer*********** */
function booleanAnswerIsIncorrect() {
    incrementIncorrect();
    overallIncorrect++;
    i++;
    $(".swal-button, .swal-overlay").css("display", "block");
    swal({
        title: "Incorrect!",
        icon: "error",
        button: "OK",
        });
    setTimeout(function(){
        $(".swal-button, .swal-overlay").css("display", "none");
        startQuestions();
    }, 1000);
}
/********function incorrect multiple choice answer */
function multipleChoiceAnswerIsIncorrect(correctAnswer) {
    incrementIncorrect();
    overallIncorrect++;
    i++;
    $(".swal-button, .swal-overlay").css("display", "block");
    swal({
        title: "Incorrect!",
        icon: "error",                            
        text: `The correct answer was ${correctAnswer}`,
        button: "OK",
        });
    setTimeout(function(){
        $(".swal-button, .swal-overlay").css("display", "none");
        startQuestions();
    }, 1500);
}
/******************function display question************ */
function displayQuestion() {
    overallQuestions++;
    document.getElementById("replace-question-container").innerHTML =
    `<div class="question-container">
        <h2 id="question-number">Question # ${i+1}</h2>
        <hr>
        <p id="question-text">${questionListArray.results[i].question}</p>
    </div>`;
}
/******************function display boolean true / false buttons************* */
function displayBooleanAnswerButtons() {
    document.getElementById("replace-question-container").innerHTML +=
    `<div class="boolean-answer-container">
        <button type="button" value="True" class="btn btn-success boolean-answer-button">True</button>
        <button type="button" value="False" class="btn btn-danger boolean-answer-button">False</button>
    </div>`;
}
/******************function display multiple choice buttons************** */
function displayMultipleChoiceAnswerButtons() {
    let possibleAnswers = [questionListArray.results[i].incorrect_answers[0],questionListArray.results[i].incorrect_answers[1], questionListArray.results[i].incorrect_answers[2],questionListArray.results[i].correct_answer];
    shuffle(possibleAnswers);
    document.getElementById("replace-question-container").innerHTML +=
    `<div class="row row-center multiple-answer-container">
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
    </div>`;
}
/********************incorrect question type message display************** */
function incorrectQuestionTypeMessage() {
    document.getElementById("replace-question-container").innerHTML +=
    `<div>
    <h2>Sorry ${questionListArray.results[i].type} question type not supported!</h2>
    </div>`;
    throw "Error... Incorrect question type... Aborting...";
}
/*****************display correct/incorrect question counter**************** */
function displayCorrectIncorrectCounter() {
    document.getElementById("replace-question-container").innerHTML +=
    `</div>
    <div class="row counter-container">
        <div class="col-12 col-sm-6">
            <span id="correct-answers">Correct Answers</span><span id="correct-number">${totCorrect}</span>
        </div>
        <div class="col-12 col-sm-6">
            <span id="incorrect-answers">Incorrect Answers</span><span id="incorrect-number">${totIncorrect}</span>
        </div>    
    </div>`;
}
/*************** function check if boolean answer is correct******************** */
function checkBooleanAnswer(correctAnswer) {
    let booleanAnswerButtons = document.getElementsByClassName("boolean-answer-button");
    for (let button of booleanAnswerButtons) {
        button.addEventListener("click", function() {
            let value = this.getAttribute("value");
            if(value == correctAnswer) {
                this.style.backgroundColor = "green";
                answerIsCorrect();
            } else {
                this.style.backgroundColor = "red";
                booleanAnswerIsIncorrect();
            }
        });
    }
}
/**********************check multiple choice answer if correct *************/
function checkMultipleChoiceAnswer(correctAnswer) {
    let multipleAnswerButtons = document.getElementsByClassName("multiple-answer-button");
    for (let answerButton of multipleAnswerButtons) {
        answerButton.addEventListener("click", function() {
            let value = this.getAttribute("value");
            if(value == correctAnswer) {
                this.style.backgroundColor = "green";
                answerIsCorrect();
            } else {
                this.style.backgroundColor = "red";
                multipleChoiceAnswerIsIncorrect(correctAnswer);
            }
        });
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
    result = ((totCorrect*100)/questionListArray.results.length).toFixed(2);
    return result;
}
// calculate the overall percentace of correct answers of the game session
function overallPercentageCorrect() {
    overallResult = ((overallCorrect*100)/overallQuestions).toFixed(2);
    console.log(overallResult);
    return overallResult
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
        <p>Your score for this session is:<br><span id="total-correct-answers">${totCorrect}</span> Correct answers<br><span id="final-incorrect-answers">${totIncorrect}</span> Incorrect answers</p>
        <p>You got <span id="correct-precentage">${result}</span>% of correct answers!</p>
        <br>
        <p>Your overall score:<br><span>You have answered a total of ${overallQuestions} questions.</span><br><span id="overall-correct-answers">${overallCorrect}</span> Correct answers<br><span id="overall-incorrect-answers">${overallIncorrect}</span> Incorrect answers</p>
        <p>You got <span id="correct-precentage">${overallResult}</span>% of correct answers!</p>
    </div>
    <!--------------------share buttons popup--------------------->
    <div class="share-result-wrapper container-fluid" id="share-box">
        <div class="toggle-button" id="tggl-btn">
            <ul>
                <li><a href="" id="share-btn">
                    <span class="text">Share</span>
                    <span class="icon"><i class="fas fa-share-alt"></i></span>
                </a></li>
                <li><a href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}" class="sm facebook" target="_blank">
                    <span class="icon"><i class="fab fa-facebook"></i></span>
                    <span class="text">Facebook</span>
                </a></li>
                <li><a href="https://twitter.com/intent/tweet?url=${window.location.href}&text=" class="sm twitter" target="_blank">
                    <span class="icon"><i class="fab fa-twitter"></i></span>
                    <span class="text">Twitter</span>
                </a></li>
            </ul>
        </div>
    </div>
    <div class="row btn-end-test">
        <div class="col-6 end-button-container">
            <a href="index.html"><button type="button" class="btn btn-warning">Home</button></a>
        </div>
        <div class="col-6 end-button-container">
            <button type="button" class="btn btn-warning" id="continue-button">Continue</button>
        </div>
    </div>`;
    let shareButton = document.querySelector("#share-btn");
    let toggleButton = document.querySelector("#tggl-btn");
    let shareBox = document.querySelector(".share-result-wrapper");
    shareBox.addEventListener("mouseenter", function() {
    toggleButton.classList.toggle("active");
    });
}
/************function to continue with new round of questions keeping the overall score */
function continueGame() {
    document.getElementById("replace-question-container").innerHTML =
    `<div class="container-fluid message-home" id="message-homepage">
        <p>Get ready for round number ${questionRound}</p>
    </div>
    <div class="go-btn-section" id="go-button-section">
        <div class="row">
            <div class="col-12" id="homepage-btn-container">
                <button class="start-game-btn" id="start-game-button"><span class="go-button-text">Start</span></button>
            </div>
        </div>
    </div>
    <div class="start-btn-section" id="countdown-section">
        <div class="container-fluid message-home">
            <p>Ready to start!!!! <br>Good Luck.. and Enjoy!!</p>
        </div>
        <div class="countdown-container">
            <div class="countdown-timer">
                <div class="time-left" id="time-left"></div>
            </div>
        </div>
    </div>`
    questionRound++;
    totCorrect = 0;
    totIncorrect = 0;
    i = 0;
    startPage();
}
// function taken from stack overflow
function shuffle(possibleAnswers) {
    var currentIndex = possibleAnswers.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = possibleAnswers[currentIndex];
        possibleAnswers[currentIndex] = possibleAnswers[randomIndex];
        possibleAnswers[randomIndex] = temporaryValue;
    }
    return possibleAnswers;
}
/**************************modal section*********************************** */
/****************************instructions modal******************************/
let instructionsLink = document.getElementById("instructions-link");
let instructionsModal = document.getElementById("instructions-modal");
instructionsLink.addEventListener("click", function() {
    instructionsModal.style.display = "block";
    introJs().start();
    let exitInstructions = document.getElementById("exit-instructions");
    exitInstructions.addEventListener("click", function() {
        instructionsModal.style.display = "none";
    });
    window.onclick = function(event) {
    if (event.target == instructionsModal) {
        instructionsModal.style.display = "none";
        }
    }
});
/**********************contact modal******************************/
let contactLink = document.getElementById("contact-link");
let contactModal = document.getElementById("contact-modal");
if(contactLink) {
    contactLink.addEventListener("click", function() {
        contactModal.style.display = "block";
        window.onclick = function(event) {
        if (event.target == contactModal) {
            contactModal.style.display = "none";
            }
        }
    });
}
/**********************registration modal******************************/
let registrationLink = document.getElementById("registration-link");
let registrationModal = document.getElementById("registration-modal");
if(registrationLink) {
    registrationLink.addEventListener("click", function() {
        registrationModal.style.display = "block";
        window.onclick = function(event) {
        if (event.target == registrationModal) {
            registrationModal.style.display = "none";
            }
        }
    });
}
/********************switching dark light mode************************** */
let darkLightToggle = document.getElementById("dark-light-toggle");
darkLightToggle.addEventListener("click", changeMode);
function changeMode() {
    let darkLightToggle = document.getElementById("dark-light-toggle");
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
}