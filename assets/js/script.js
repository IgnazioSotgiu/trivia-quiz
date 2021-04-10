/*jshint esversion: 6 */ 
// declare global variables
let amountQuestions;
let questionListArray = [];
let chosenCategory = "";
let difficultyLevel = "";
let i = 0;
let totCorrect = 0;
let totIncorrect = 0;
let vote = "";
let result;
let overallCorrect = 0;
let overallIncorrect = 0;
let overallQuestions = 0;
let questionRound = 2;
let overallResult;

document.addEventListener("DOMContentLoaded", function() {
    logoAnimation();
    getStartBtn();
});
function logoAnimation(){
    let mainLogo = document.getElementById("logo");
    let mainLogoRight = document.getElementById("logo-right");
    mainLogo.style.left = "50%";
    mainLogoRight.style.right = "50%";
    mainLogo.style.transform = "translate(-50%)";
    mainLogoRight.style.transform = "translate(50%)";
}
function getStartBtn() {
    let startGameButton = document.getElementById("start-game-button");
    if(startGameButton) {
        startGameButton.addEventListener("click", selectCategory);
    }else {
        setTimeout(getStartBtn(), 500);
    }
}
//***************category selection function************************* */
function selectCategory() {
    openSelectCategoryModal();
    let categories = document.getElementsByClassName("category-choice-btn");
    for(let category of categories) {
        category.addEventListener("click", function() {
            chosenCategory = this.getAttribute("value");
            this.style.backgroundColor = "rgb(42, 235, 42)";
            setTimeout(function(){
                $("#category-choice-modal").css("display", "none");
                selectDifficultyLevel(chosenCategory);
            },500);  
        });
    }
}
/******************************difficulty level selection function************** */
function selectDifficultyLevel() {
    openDifficultyLevelModal();
    let difficulties = document.getElementsByClassName("difficulty-sel-input");    
    for(let difficulty of difficulties) {
        difficulty.addEventListener("click", function() {
            difficultyLevel = this.getAttribute("value");
            setTimeout(function(){
                $("#difficulty-choice-modal").css("display", "none");
                showCountdown(chosenCategory, difficultyLevel);
            },500);
        });
    }
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
//https://www.youtube.com/watch?v=vSV_Ml2_A88 tutorial
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
        startQuestions();
    }, 3800);
}
function getQuestionsAmount() {
    switch(difficultyLevel) {
        case "easy":
            amountQuestions = "10";
            break;
        case "medium":
            amountQuestions = "13";
            break;
        case "hard":
            amountQuestions = "15";
            break;
        default:
        console.log("Error. Difficulty choice not recognized");
        throw("Error. Difficulty choice not recognized. Aborting....");
    }
    return amountQuestions;

}
/**************get the question array from open trivia db  api************** */
function getQuestionArray(chosenCategory, difficultyLevel){
    getQuestionsAmount();
    let xhr = new XMLHttpRequest();
    xhr.open("GET" , `https://opentdb.com/api.php?amount=${amountQuestions}&category=${chosenCategory}&difficulty=${difficultyLevel}`);
    xhr.send();
    xhr.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
        questionListArray = JSON.parse(this.responseText);
        
        }
    };
    setTimeout(function() {
        return questionListArray;
    }, 500);
}
// function to decode html special characters to compare the correct 
// answer with multiple answer value after displayed on screen
// function taken from stack overflow
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
//***************main game function********************** */
function startQuestions(event) {
    if (i < questionListArray.results.length) {
        let correctAnswer = decodeHtml(questionListArray.results[i].correct_answer);
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
        continueBtn();
        
    }
}
function continueBtn() {
    let continueButton = document.getElementById("continue-button");
    continueButton.addEventListener("click", continueGame);
}
/*****************function correct answer*************** */
function isAnswerCorrect() {
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
    let multipleAnswers = [questionListArray.results[i].incorrect_answers[0],questionListArray.results[i].incorrect_answers[1], questionListArray.results[i].incorrect_answers[2], questionListArray.results[i].correct_answer];
    shuffle(multipleAnswers);
    document.getElementById("replace-question-container").innerHTML +=
    `<div class="row row-center multiple-answer-container">
        <div class="col-12 col-sm-6">
            <button class=" btn btn-secondary multiple-answer-button" id="btn-1" type="button" name="answer" value="${multipleAnswers[0]}">${multipleAnswers[0]}</button>
        </div>
        <div class="col-12 col-sm-6">
            <button class="btn btn-secondary multiple-answer-button" id="btn-2" type="button" name="answer" value="${multipleAnswers[1]}">${multipleAnswers[1]}</button>
        </div>
        <div class="col-12 col-sm-6">
            <button class="btn btn-secondary multiple-answer-button" id="btn-3" type="button" name="answer" value="${multipleAnswers[2]}">${multipleAnswers[2]}</button>
        </div>
        <div class="col-12 col-sm-6">
            <button class="btn btn-secondary multiple-answer-button" id="btn-4" type="button" name="answer" value="${multipleAnswers[3]}">${multipleAnswers[3]}</button>
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
    `<div class="row counter-container">
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
            if(value === correctAnswer) {
                this.style.backgroundColor = "green";
                isAnswerCorrect();
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
            if(value === correctAnswer) {
                this.style.backgroundColor = "green";
                isAnswerCorrect();
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
    result = parseFloat((totCorrect*100)/questionListArray.results.length).toFixed(2);
    return result;
}
// calculate the overall percentace of correct answers of the game session
function overallPercentageCorrect() {
    overallQuestions = parseInt(overallCorrect + overallIncorrect);
    overallResult = parseFloat((overallCorrect*100)/overallQuestions).toFixed(2);
    return overallResult;
}
// Depending of the value of the variable result 
// evaluate the user performance in the test
function giveTestEvaluation(result) {
    if(result == 100.00) {
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
        <p>Your score for the last round is:<br><span class="results-color" id="total-correct-answers">${totCorrect}</span> Correct answers<br><span class="results-color" id="final-incorrect-answers">${totIncorrect}</span> Incorrect answers</p>
        <p>You got <span class="results-color" id="correct-precentage">${result}%</span> of correct answers!</p>
        <br>
        <p>Your overall score:<br><span>You have answered a total of ${overallQuestions} questions.</span><br><span class="results-color" id="overall-correct-answers">${overallCorrect}</span> Correct answers<br><span class="results-color" id="overall-incorrect-answers">${overallIncorrect}</span> Incorrect answers</p>
        <p>You got <span class="results-color" id="correct-precentage">${overallResult}%</span> of correct answers!</p>
    </div>
    <!--------------------share buttons popup--------------------->
    <div class="share-result-wrapper container-fluid" id="share-box">
        <div class="toggle-button" id="tggl-btn">
            <ul>
                <li><button id="share-btn">
                    <span class="text">Share</span>
                    <span class="icon"><i class="fas fa-share-alt"></i></span>
                </button></li>
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
        <div class="col-12 col-sm-6 end-button-container">
            <button type="button" class="btn btn-warning" id="continue-button">Continue</button>
        </div>
        <div class="col-12 col-sm-6 end-button-container">
            <a href="index.html"><button type="button" class="btn btn-warning reset-btn">Reset</button></a>
        </div>
    </div>`;
    shareResult();
}
/*******************function to share resul on twitter and facebook***************** */
function shareResult() {
    let toggleButton = document.getElementById("tggl-btn");
    let shareBox = document.getElementById("share-box");
    shareBox.addEventListener("click", function() {
        toggleButton.classList.toggle("active");
    });
}
/************function to continue with new round of questions keeping the overall score */
function continueGame() {
    document.getElementById("replace-question-container").innerHTML =
    `<div class="container-fluid message-home" id="message-homepage">
        <h2>Get ready for round number ${questionRound}</h2>
    </div>
    <div class="start-btn-section" id="go-button-section">
        <div class="row">
            <div class="col-12" id="homepage-btn-container">
                <button class="start-game-btn" id="start-game-button"><span class="start-button-text">Start</span></button>
            </div>
        </div>
    </div>
    <div class="countdown-section" id="countdown-section">
        <div class="container-fluid message-home">
            <h2>Ready to start!!!! <br>Good Luck.. and Enjoy!!</h2>
        </div>
        <div class="countdown-container">
            <div class="countdown-timer">
                <div class="time-left" id="time-left"></div>
            </div>
        </div>
    </div>`;
    questionRound++;
    totCorrect = 0;
    totIncorrect = 0;
    i = 0;
    getStartBtn();
}
// function taken from stack overflow
function shuffle(multipleAnswers) {
    var currentIndex = multipleAnswers.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = multipleAnswers[currentIndex];
        multipleAnswers[currentIndex] = multipleAnswers[randomIndex];
        multipleAnswers[randomIndex] = temporaryValue;
    }
    return multipleAnswers;
}
/**************************modal section*********************************** */
/***************************difficulty level modal************************** */
function openDifficultyLevelModal() {
    let difficultyChoiceModal = document.getElementById("difficulty-choice-modal");
    difficultyChoiceModal.style.display = "block";
    window.onclick = function(event) {
    if (event.target == difficultyChoiceModal) {
        difficultyChoiceModal.style.display = "none";
        }
    };
}
/*****************************category selection modal******************** */
function openSelectCategoryModal() {
    let categoryChoiceModal = document.getElementById("category-choice-modal");
    categoryChoiceModal.style.display = "block";
    window.onclick = function(event) {
    if (event.target == categoryChoiceModal) {
        categoryChoiceModal.style.display = "none";
        }
    };
}
/****************************instructions modal******************************/
let instructionsLink = document.getElementById("instructions-link");
let instructionsModal = document.getElementById("instructions-modal");
instructionsLink.addEventListener("click", function() {
    instructionsModal.style.display = "block";
    let exitInstructions = document.getElementById("exit-instructions");
    exitInstructions.addEventListener("click", function() {
        instructionsModal.style.display = "none";
    });
    window.onclick = function(event) {
    if (event.target == instructionsModal) {
        instructionsModal.style.display = "none";
        }
    };
    let cancelInstructions = document.getElementById("instructions-cancel-btn");
    cancelInstructions.addEventListener("click", function() {
        instructionsModal.style.display = "none";
    });
});
/**********************contact modal******************************/
let contactLink = document.getElementById("contact-link");
let contactModal = document.getElementById("contact-modal");
contactLink.addEventListener("click", function() {
    contactModal.style.display = "block";
    window.onclick = function(event) {
    if (event.target == contactModal) {
        contactModal.style.display = "none";
        }
    };
    let cancelBtn = document.getElementById("contact-cancel-btn");
    cancelBtn.addEventListener("click", function() {
        contactModal.style.display = "none";
    });
});
/**********************registration modal******************************/
let registrationLink = document.getElementById("registration-link");
let registrationModal = document.getElementById("registration-modal");
registrationLink.addEventListener("click", function() {
    registrationModal.style.display = "block";
    window.onclick = function(event) {
    if (event.target == registrationModal) {
        registrationModal.style.display = "none";
        }
    };
    let cancelRegBtn = document.getElementById("cancel-registration-btn");
    cancelRegBtn.addEventListener("click", function() {
        registrationModal.style.display = "none";
    });
});
/********************switching dark light mode************************** */
let darkLightToggle = document.getElementById("dark-light-toggle");
darkLightToggle.addEventListener("click", changeMode);
function changeMode() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
}