// declare variables

let questionListArray;
let chosenCategory;
let difficultyLevel;
let i = 0;
let totCorrect = 0;
let totIncorrect = 0;
let vote = "";

/*keep registeredUserDatabase in local storage
let registeredUserDatabase = [];
localStorage.setItem("registeredUserDatabase", JSON.stringify(registeredUserDatabase));*/

// wait for the DOM to finish loading page
// then collect the input to choose the level of difficulty

document.addEventListener("DOMContentLoaded", function() {
    //getReadyStart();

    let categoryButton = document.getElementById("category-choice-link");
    categoryButton.addEventListener("click", selectCategory);

    let difficultyButton = document.getElementById("difficulty-choice-link");
    difficultyButton.addEventListener("click", selectDifficultyLevel);
    
    let startButton = document.getElementById("start-button");
    startButton.addEventListener("click", checkSelection);
});


// after the level of difficulty has bee chosen 
// the function get ready calls the get question array function
//few more steps before the user press the start button 

function getReady(difficultyLevel, chosenCategory) {

    getQuestionArray(difficultyLevel, chosenCategory);
    //alert(`You have select the ${difficultyLevel} level`);

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
    } else (
        console.log("error. not recognize difficulty choice")
    )

    console.log(difficultyLevel, chosenCategory, amountQuestions);

    xhr.open("GET" , `https://opentdb.com/api.php?amount=${amountQuestions}&category=${chosenCategory}&difficulty=${difficultyLevel}`);
    xhr.send("POST");

    xhr.onreadystatechange = function() {
    
    if(this.readyState === 4 && this.status === 200) {
        questionListArray = JSON.parse(this.responseText);
        console.log(questionListArray);

        //createStartButton();
        $("#start-button").css({"background-color": "#1fe24c"});

        }
    }
    return questionListArray;
}

// adding event listener waiting for the click of the start 
// button to execute startQuestion function

/*let myButton = document.getElementById("start-button");
if(myButton) {
    myButton.addEventListener("click", startQuestions);
}*/


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
            
            let booleanAnswerButtons = document.getElementsByClassName("boolean-answer-button");
            console.log(booleanAnswerButtons);

            for (let button of booleanAnswerButtons) {
                button.addEventListener("click", function() {
                    let value = this.getAttribute("value");
                    let btnId = this.getAttribute("id");

                    if(value == correctAnswer) {
                        this.style.backgroundColor = "green";
                        incrementCorrect();
                        i++;
                        //alert("Congratulations! Your answer is correct");
                        setTimeout(function(){
                            startQuestions();
                        }, 1000); 
                    } else {
                        this.style.backgroundColor = "red";
                        incrementIncorrect();
                        i++;
                        //alert(`Arrgh.... Your answer is incorrect. Keep practicing!`);
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
                    let btnId = this.getAttribute("id");

                    if(value == correctAnswer) {
                        //changeGreenBgColor(btnId);
                        this.style.backgroundColor = "green";
                        incrementCorrect();
                        i++;
                        //alert("Congratulations! Your answer is correct");
                        setTimeout(function(){
                            startQuestions();
                        }, 1000);
                    } else {
                        //changeRedBgColor(btnId);
                        this.style.backgroundColor = "red";
                        incrementIncorrect();
                        i++;
                        //alert(`Arrgh.... Your answer is incorrect. Keep practicing!`+ "\n" +`The correct answer was ${correctAnswer}`);
                        setTimeout(function(){
                            startQuestions();
                        }, 1000);
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
    result = ((totCorrect*100)/questionListArray.results.length).toFixed(2);
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

/*// Change selected button background to green if answer is correct
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
}*/
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

/**********************category choice modal******************************/
/*let categoryChoiceLink = document.getElementById("category-choice-link");
let categoryChoiceModal = document.getElementById("category-choice-modal");
if(categoryChoiceLink) {
    categoryChoiceLink.addEventListener("click", function() {
        //console.log(loginModal);

        categoryChoiceModal.style.display = "block";

        window.onclick = function(event) {
        if (event.target == categoryChoiceModal) {
            categoryChoiceModal.style.display = "none";
            }
        }
    });
}*/

/**********************difficulty choice modal******************************/
/*let difficultyChoiceLink = document.getElementById("difficulty-choice-link");
let difficultyChoiceModal = document.getElementById("difficulty-choice-modal");
if(difficultyChoiceLink) {
    difficultyChoiceLink.addEventListener("click", function() {
        //console.log(loginModal);

        difficultyChoiceModal.style.display = "block";

        window.onclick = function(event) {
        if (event.target == difficultyChoiceModal) {
            difficultyChoiceModal.style.display = "none";
            }
        }
    });
}*/
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


// choice category modal mouseenter function

/*let categoryButtons = document.getElementsByClassName("category-choice-btn");
console.log(categoryButtons);
for(let button of categoryButtons) {
    button.addEventListener("mouseenter", function() {
        this.style.backgroundColor = "orange";
    });
}*/

// choice category modal mouseleave function

/*categoryButtons = document.getElementsByClassName("category-choice-btn");
console.log(categoryButtons);
for(let button of categoryButtons) {
    button.addEventListener("mouseleave", function() {
        let bg = getComputedStyle(this);
        console.log(bg['background-color']);
        if(bg === "rgb(255, 165, 0)")
        this.style.backgroundColor = "#fafafa";
    });
}*/

// choice category modal change selected button function
/*categoryButtons = document.getElementsByClassName("category-choice-btn");
console.log(categoryButtons);
for(let button of categoryButtons) {
    button.addEventListener("click", function() {
        this.style.backgroundColor = "green";
    });
}*/
function selectCategory(){
    let categoryChoiceModal = document.getElementById("category-choice-modal");
    categoryChoiceModal.style.display = "block";
    let categories = document.getElementsByClassName("category-choice-btn");
    console.log(categories);

    window.onclick = function(event) {
        if (event.target == categoryChoiceModal) {
            categoryChoiceModal.style.display = "none";
            }
        }

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
                    </button>`
                //getReady(difficultyLevel);

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
                    </button>`
                //getReady(difficultyLevel);

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
                    </button>`
                //getReady(difficultyLevel);

            }else {
                alert("Incorrect value. Please select the difficulty level");
                throw "Error... Incorrect value... Aborting...";
                }
            
        });
    }
    return difficultyLevel;
}
/*function createStartButton() {
    document.getElementsByClassName("start-button-container").innerHTML =
    `<button type="button" id="start-button" class="btn btn-success"><i class="fas fa-hourglass-start"><br><span id="start-button-text">Start</span></i></button>`;
}*/

/*function getReadyStart() {
    let gameChoices = document.getElementsByClassName("game-choice-btn");
    console.log(gameChoices);

    for(let choice of gameChoices) {
        choice.addEventListener("click", function() {
            if (this.getAttribute("value") === "category") {
                selectCategory();
            } else if (this.getAttribute("value") === "difficulty") {
                selectDifficultyLevel();
                
            } else {
                alert("Incorrect value. Please select the difficulty level");
                throw "Error... Incorrect value... Aborting...";
            }
        });
    }
    return chosenCategory, difficultyLevel;
}*/
    /*let gameChoices = document.getElementsByClassName("game-choice-btn");
    console.log(gameChoices);

    for(let choice of gameChoices) {
        choice.addEventListener("click", function() {
            if (this.getAttribute("value") === "category") {
                selectCategory();
            } else if (this.getAttribute("value") === "difficulty") {
                selectDifficultyLevel();
                
            } else {
                alert("Incorrect value. Please select the difficulty level");
                throw "Error... Incorrect value... Aborting...";
            }
        });
    }*/

function checkSelection() {

    console.log(chosenCategory, difficultyLevel);

    if(chosenCategory && difficultyLevel) {
    
        console.log(chosenCategory, difficultyLevel);
        getReady(chosenCategory, difficultyLevel);

        setTimeout(function() {
            startQuestions(questionListArray);
        }, 1000);
    } else if(chosenCategory && !difficultyLevel) {
        alert("please select a difficulty level");
    } else if(!chosenCategory && difficultyLevel) {
        alert("please select category");
    } else {
        alert("please select category and difficulty level to play")
    }
    
}
// connecting the contact email with my gmail account using emailJs