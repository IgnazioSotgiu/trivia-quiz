// declare variables

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


// wait for the DOM to finish loading page
//add event listeners for the category choice, the level 
// of difficulty, and the start button.

document.addEventListener("DOMContentLoaded", function() {

    //logo animation

    let mainLogo = document.getElementById("logo");
    let mainLogoRight = document.getElementById("logo-right");
    mainLogo.style.left = "50%";
    mainLogoRight.style.right = "50%";

    mainLogo.style.transform = "translate(-50%)";
    mainLogoRight.style.transform = "translate(50%)";

    startPage()
});

// function startpage gets all the event listeners ready to start the game

function startPage(){


    let categoryButton = document.getElementById("category-choice-link");
    categoryButton.addEventListener("click", selectCategory);

    let difficultyButton = document.getElementById("difficulty-choice-link");
    difficultyButton.addEventListener("click", selectDifficultyLevel);
    
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", checkSelection);

}


// after the level of difficulty has bee chosen 
// the function get ready calls the get question array function
//few more steps before the user press the start button 

function getReady(difficultyLevel, chosenCategory) {

    getQuestionArray(difficultyLevel, chosenCategory);

    setTimeout(function() {
        console.log(questionListArray);
        }, 500);
}

// passing the difficulty level to a function for 
// getting the list of question from remote api
// and store it in a array questionListArray
function getQuestionArray(chosenCategory, difficultyLevel){
    let xhr = new XMLHttpRequest();
    let amountQuestions;
    console.log(difficultyLevel);
    if(difficultyLevel == "easy") {
        amountQuestions = "10";
    } else if(difficultyLevel == "medium") {
        amountQuestions = "13";
    } else if(difficultyLevel == "hard") {
        amountQuestions = "15";
    } else {
        console.log("Error. Difficulty choice not recognized");
        throw("Error. Difficulty choice not recognized. Aborting....");
    }


    xhr.open("GET" , `https://opentdb.com/api.php?amount=${amountQuestions}&category=${chosenCategory}&difficulty=${difficultyLevel}`);
    xhr.send("POST");

    xhr.onreadystatechange = function() {
    
    if(this.readyState === 4 && this.status === 200) {
        questionListArray = JSON.parse(this.responseText);
        console.log(questionListArray);

        $("#start-button").css({"background-color": "#1fe24c"});

        }
    };
    return questionListArray;
}

// display the question on the array and creating a event listener
// for the true and false button that the user will click to 
// select the right answer

function startQuestions(event) {
    if(questionListArray) {
        
        if (i < questionListArray.results.length) {
            overallQuestions++;

            let correctAnswer = questionListArray.results[i].correct_answer;
            console.log(correctAnswer);
            document.getElementById("replace-question-container").innerHTML =

            `<div class="question-container">
                <h2 id="question-number">Question # ${i+1}</h2>
                <hr>
                <p id="question-text">${questionListArray.results[i].question}</p>
            </div>`;
            
            if (questionListArray.results[i].type === "boolean") {
                document.getElementById("replace-question-container").innerHTML +=
                
                `<div class="user-answer-container">
                    <button type="button" value="True" class="btn btn-success boolean-answer-button">True</button>
                    <button type="button" value="False" class="btn btn-danger boolean-answer-button">False</button>
                </div>`;
                
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
                </div>`;
            } else {
                document.getElementById("replace-question-container").innerHTML +=
                `<div>
                <h2>Sorry ${questionListArray.results[i].type} question type not supported!</h2>
                </div>`;
            throw "Error... Incorrect question type... Aborting...";
            }
            document.getElementById("replace-question-container").innerHTML +=
            `</div>
            <div class="counter-container">
                <span id="correct-answers">Correct Answers</span><span id="correct-number">${totCorrect}</span><span id="incorrect-answers">Incorrect Answers</span><span id="incorrect-number">${totIncorrect}</span>
            </div>`;
            
            let booleanAnswerButtons = document.getElementsByClassName("boolean-answer-button");
            console.log(booleanAnswerButtons);

            for (let button of booleanAnswerButtons) {
                button.addEventListener("click", function() {
                    let value = this.getAttribute("value");

                    if(value == correctAnswer) {
                        this.style.backgroundColor = "green";
                        incrementCorrect();
                        overallCorrect++;
                        i++;
                        //alert("Congratulations! Your answer is correct");
                        swal({
                            title: "Good job!",
                            icon: "success",
                            button: "OK",
                            });
                        setTimeout(function(){
                            startQuestions();
                        }, 1000); 
                    } else {
                        this.style.backgroundColor = "red";
                        incrementIncorrect();
                        overallIncorrect++;
                        i++;
                        //alert(`Arrgh.... Your answer is incorrect. Keep practicing!`);
                        swal({
                            title: "Incorrect!",
                            icon: "error",
                            button: "OK",
                            });
                        setTimeout(function(){
                            startQuestions();
                        }, 1000);
                    }
                });
            }
            let multipleAnswerButtons = document.getElementsByClassName("multiple-answer-button");
            console.log(multipleAnswerButtons);
            
            for (let answerButton of multipleAnswerButtons) {
                answerButton.addEventListener("click", function() {
                    let value = this.getAttribute("value");

                    if(value == correctAnswer) {
                        this.style.backgroundColor = "green";
                        incrementCorrect();
                        overallCorrect++;
                        i++;
                        //alert("Congratulations! Your answer is correct");
                        swal({
                            title: "Good job!",
                            icon: "success",
                            button: "OK",
                            });
                        setTimeout(function(){
                            startQuestions();
                        }, 1000);
                    } else {
                        //changeRedBgColor(btnId);
                        this.style.backgroundColor = "red";
                        incrementIncorrect();
                        overallIncorrect++;
                        i++;
                        //alert(`Arrgh.... Your answer is incorrect. Keep practicing!`+ "\n" +`The correct answer was ${correctAnswer}`);
                        swal({
                            title: "Incorrect!",
                            icon: "error",                            
                            text: `The correct answer was ${correctAnswer}`,
                            button: "OK",
                            });
                        setTimeout(function(){
                            startQuestions();
                        }, 1000);
                    }
                });
            }

        } else {
            
            calculatePercentageCorrect();
            overallPercentageCorrect();
            giveTestEvaluation(result);
            displayEndPage(vote, result, overallResult);
            let continueButton = document.getElementById("continue-button");
            continueButton.addEventListener("click", continueGame);
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
    result = ((totCorrect*100)/questionListArray.results.length).toFixed(2);
    return result;
}
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
    <div class="row">
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
/**************************modal section**************************** */

/****************************instructions modal******************************/
let instructionsLink = document.getElementById("instructions-link");
let instructionsModal = document.getElementById("instructions-modal");
if(instructionsLink) {
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
        }
    });
}

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
        let contactHomeLink = document.getElementById("contact-home-link");
        contactHomeLink.addEventListener("click", function() {
            contactModal.style.display = "none";
        });
    });
}

/*
// function to get the value from registration form
// and save them as an object into array

let registrationButton = document.getElementById("registration-button");
registrationButton.addEventListener("click", function() {
    let user = [];

    //if()

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


// choice category modal mouseenter function

/*let categoryButtons = document.getElementsByClassName("category-choice-btn");
console.log(categoryButtons);
for(let button of categoryButtons) {
    button.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "orange";
    });
}*/


function selectCategory(){
    //let chosenCategory;
    let categoryChoiceModal = document.getElementById("category-choice-modal");
    categoryChoiceModal.style.display = "block";
    let categories = document.getElementsByClassName("category-choice-btn");
    console.log(categories);

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
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="general">
                        <i class="fas fa-brain"><br><span class="category-name">General</span></i>
                    </button>`
                    break;

                case "book":
                    chosenCategory = "10";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="book">
                        <i class="fas fa-book"><br><span class="category-name">Books</span></i>
                    </button>`
                    break;

                case "film":
                    chosenCategory = "11";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="film">
                        <i class="fas fa-film"><br><span class="category-name">Movies</span></i>
                    </button>`
                    break;
                    
                case "music":
                    chosenCategory = "12";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="music">
                        <i class="fas fa-music"><br><span class="category-name">Music</span></i>
                    </button>`
                    break;

                case "tv":
                    chosenCategory = "14";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="tv">
                        <i class="fas fa-tv"><br><span class="category-name">TV</span></i>
                    </button>`
                    break;

                case "video-games":
                    chosenCategory = "15";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="video-games">
                        <i class="fas fa-gamepad"><br><span class="category-name">Videogames</span></i>
                    </button>`
                    break;

                case "computer":
                    chosenCategory = "18";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="computer">
                        <i class="fas fa-laptop"><br><span class="category-name">Computer</span></i>
                    </button>`
                    break;

                case "math":
                    chosenCategory = "19";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="math">
                        <i class="fas fa-calculator"><br><span class="category-name">Math</span></i>
                    </button>`
                    break;

                case "sport":
                    chosenCategory = "21";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="sport">
                        <i class="fas fa-futbol"><br><span class="category-name">Sport</span></i>
                    </button>`
                    break;

                case "geography":
                    chosenCategory = "22";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="geography">
                        <i class="fas fa-atlas"><br><span class="category-name">Geography</span></i>
                    </button>`
                    break;

                case "history":
                    chosenCategory = "23";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="history">
                        <i class="fas fa-history"><br><span class="category-name">History</span></i>
                    </button>`
                    break;

                case "animals":
                    chosenCategory = "27";
                    this.style.backgroundColor = "rgb(42, 235, 42)";
                    this.style.color = "#000";
                    setTimeout(function(){
                        categoryChoiceModal.style.display = "none";
                    },1000);
                    document.getElementById("category-container").innerHTML =
                    `<button class="chosen-category-choice-btn" value="animals">
                        <i class="fas fa-paw"><br><span class="category-name">Animals</span></i>
                    </button>`
                    break;
            }
        });
    }
    return chosenCategory;

}


function selectDifficultyLevel() {
    //let difficultyLevel;
    let difficultyChoiceModal = document.getElementById("difficulty-choice-modal");
    difficultyChoiceModal.style.display = "block";
    let difficulties = document.getElementsByClassName("difficulty-sel-input");
    console.log(difficulties);

    window.onclick = function(event) {
        if (event.target == difficultyChoiceModal) {
            difficultyChoiceModal.style.display = "none";
            }
        }

    for(let difficulty of difficulties) {
        difficulty.addEventListener("click", function() {
            if (this.getAttribute("value") === "easy") {
                difficultyLevel = this.getAttribute("value");
                this.style.backgroundColor = "rgb(42, 235, 42)";
                this.style.color = "#000";
                setTimeout(function(){
                    difficultyChoiceModal.style.display = "none";
                },1000);
                document.getElementById("difficulty-container").innerHTML =
                    `<button class="difficulty-sel-input" value="easy" type="radio" id="easy-btn" name="difficulty">
                        <i class="fas fa-skiing"><br><span class="difficulty-name">Easy</span></i>
                    </button>`;

            }else if (this.getAttribute("value") === "medium") {
                difficultyLevel = this.getAttribute("value");
                this.style.backgroundColor = "rgb(255, 238, 0)";
                this.style.color = "#000";
                setTimeout(function(){
                    difficultyChoiceModal.style.display = "none";
                },1000);
                document.getElementById("difficulty-container").innerHTML =
                    `<button class="difficulty-sel-input" value="medium" type="radio" id="medium-btn" name="difficulty">
                        <i class="fas fa-arrow-alt-circle-right"><br><span class="difficulty-name">Medium</span></i>
                    </button>`;

            }else if (this.getAttribute("value") === "hard") {
                difficultyLevel = this.getAttribute("value");
                this.style.backgroundColor = "rgb(250, 0, 0)";
                this.style.color = "#000";
                setTimeout(function(){
                    difficultyChoiceModal.style.display = "none";
                },1000);
                document.getElementById("difficulty-container").innerHTML =
                    `<button class="difficulty-sel-input" value="hard" type="radio" id="hard-btn" name="difficulty">
                        <i class="fas fa-mountain"><br><span class="difficulty-name">Hard</span></i>
                    </button>`;

            }else {
                alert("Incorrect value. Please select the difficulty level");
                throw "Error... Incorrect value... Aborting...";
                }
            
        });
    }
    return difficultyLevel;
}

function checkSelection() {

    console.log(chosenCategory, difficultyLevel);

    if(chosenCategory && difficultyLevel) {
    
        console.log(chosenCategory, difficultyLevel);
        getReady(chosenCategory, difficultyLevel);

        setTimeout(function() {
            startQuestions(questionListArray);
        }, 1000);
    } else if(chosenCategory && !difficultyLevel) {
        //alert("please select a difficulty level");
        swal({
            text: "Please choose the difficulty level",
            button: "OK",
        });
    } else if(!chosenCategory && difficultyLevel) {
        //alert("please select category");
        swal({
            text: "Please choose a category",
            button: "OK",
        });
    } else {
        //alert("please select category and difficulty level to play");
        swal({
            text: "Please choose the difficulty level and a category before start",
            button: "OK",
        });
    }
    
}

let themeSwitch = document.getElementById("theme-switch");
themeSwitch.addEventListener("click", changeMode);

function changeMode() {
    let themeValue = document.getElementById("theme-switch");
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
}

function continueGame() {
    document.getElementById("replace-question-container").innerHTML =
    `<div class="container-fluid" id="message-homepage">
            <p>Welcome to the Trivia Quiz game. <br>Choose the Category and the Difficulty level and start to play...</p>
        </div>
        <div class="row game-choice">
            <div class="col-12 col-sm-6" id="category-container">
                <button class="game-choice-btn" value="category" name="game"
                    id="category-choice-link" data-open="category-choice-modal" data-toggle="category-choice-modal" data-backdrop="false">
                    <i class="fas fa-question"><br><span class="category-choice-name">Category</span></i>
                </button>
            </div>
            <div class="col-12 col-sm-6" id="difficulty-container">
                <button class="game-choice-btn" value="difficulty" name="game"
                    id="difficulty-choice-link" data-open="difficulty-choice-modal" data-toggle="difficulty-choice-modal" data-backdrop="false">
                    <i class="fas fa-signal"><br><span class="category-name">Level</span></i>
                </button>
            </div>
        </div>
        <div class="start-button-container">
            <button type="button" id="start-button" class="btn btn-success"><i class="fas fa-play"><br><span id="start-button-text">Start</span></i></button>
        </div>
    </div>`;

    totCorrect = 0;
    totIncorrect = 0;
    i = 0;
    startPage();

}

 