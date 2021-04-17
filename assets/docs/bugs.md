## List of bugs found:  

### Bug #1

1.  **Give Short bug description:**  
On mobile device a white vertical band appear in the screen on the right for the full height of the page also a white space appears at the bottom of the page for the full width of the screen 
1.  **Steps to trigger the bug:**  
    1. Open the website https://ignaziosotgiu.github.io/trivia-quiz/  with chrome browser 
    1. Open chrome developer tool  
    1. Select mobile view with the icon on the top left of developer tool windows  
1. **Description of the unwanted behaviour:**  
    A white band appear on the right and the bottom of the mobile screen  
    ![](./bugs/bug-1.png)  
1. **Solution found:**  
    Find a solution on stack overflow website:  
    Added overflow-x hidden and relative position for HTML and body  

### Bug #2  

1.  **Give Short bug description:**  
    The website footer doesn't stay at the bottom of the page. 
1.  **Steps to trigger the bug:**  
    Open the website https://ignaziosotgiu.github.io/trivia-quiz/ 
    Scroll down to the footer of the page   
1. **Description of the unwanted behaviour:**  
    The footer doesn't stay at the bottom of the page  
    ![](./bugs/bug-2.png)   
1. **Solution found:**  
    Find a solution on stack overflow website:  
    1. Added relative position to the HTML and body elements  
    1. Added absolute position to the footer  
    1. Added bottom 0 to the footer to stick to the bottom of the page  

### Bug #3   

1.  **Give Short bug description:**  
    When an email is entered on the registration and contact form the email is sent even if the email address is invalid 
1.  **Steps to trigger the bug:**  
    1. Open the website https://ignaziosotgiu.github.io/trivia-quiz/   
    1. Select Register for Newsletter or Contact Us link on the navigation menu 
    1. Enter a name in the form  
    1. Enter an invalid email address
    1. Tick the registration box or write a message in the Contact Us form  
    1. The email is sent successfully message appears  
1. **Description of the unwanted behaviour:**  
    The email is sent with an invalid email address   
1. **Solution found:**  
    Find a solution on stack overflow website:  
    Added the validateEmail function in sendEmail.js to check for valid email address for both Registration and Contact Us form 
    ![](./bugs/bug-3.png)  

### Bug #4    

1.  **Give Short bug description:**  
    When getting the questions from the API I store the correct answer value in correctAnswer variable.
    The issue happens when some HTML characters are present. For example. the ' character is store in the variable as #&039 from the API. The answer value selected from the HTML page will store the character as ' . When the program will compare the answer selected by the user, with the correct answer stored in the variable the 2 values will be considered different. The program will count an incorrect answer even if the user would have selected the correct one.
1.  **Steps to trigger the bug:**  
    1. Open the website https://ignaziosotgiu.github.io/trivia-quiz/   
    1. Select the Start button
    1. Select a category 
    1. Select a difficulty level
    1. Go through the questions  
    1. The issue will happen when a special HTML character is present in the correct answer value  
1. **Description of the unwanted behaviour:**  
    The message will display incorrect even if the answer was correct  
    The incorrect answer count will be updated accordingly 
1. **Solution found:**  
    Find a solution on stack overflow website:  
    Added decodeHtml function to store the value of correct answer in HTML element and then assign the HTML element value to the variable "correctAnswer". This way both user's answer and correctAnswer values will be read from HTML elements. The value will match in case of a correct answer.
    ![](./bugs/bug-4.png)    

### Bug #5    

1.  **Give Short bug description:**  
    The correct answer in multiple-choice questions always display on the same button
1.  **Steps to trigger the bug:**  
    1. Open the website https://ignaziosotgiu.github.io/trivia-quiz/   
    1. Select the Start button
    1. Select a category 
    1. Select a difficulty level
    1. Go through the questions   
1. **Description of the unwanted behaviour:**  
    The correct answer is always the bottom right button 
1. **Solution found:**  
    Find a solution on stack overflow website:  
    Passing the multipleAnswer array through the shuffle functions will assign each array value a random position.
    ![](./bugs/bug-5.png)    

### Bug #6    

1.  **Give Short bug description:**  
    The welcome message and start button on the homepage doesn't stay at the center of the screen.
1.  **Steps to trigger the bug:**  
    1. Open the website https://ignaziosotgiu.github.io/trivia-quiz/   
    1. On bigger screens the message stays on the top part of the page  
1. **Description of the unwanted behaviour:**  
    The message should stay in the center of the page but when the screen is large the user can see the message close to the top leaving a large unused space.
    ![](./bugs/bug-6.png) 
1. **Solution found:**  
    Using flexbox I was able to get responsive positioning of the message depending on the size of the screen used.
    ![](./bugs/bug-6.1.png)  

### Bug #7    

1.  **Give Short bug description:**  
    In the game, if the user clicks quickly the answer button many times the program will count those clicks and add correct/incorrect question count. Also, the program will skip the question number so the user will have fewer questions to answer.
1.  **Steps to trigger the bug:**  
    1. Open the website https://ignaziosotgiu.github.io/trivia-quiz/  
    1. Click the Start button  
    1. Choose a Category
    1. Choose a Difficulty Level
    1. Wait for the countdown screen to show the first question
    1. Click rapidly several times on any button
1. **Description of the unwanted behaviour:**  
    The game will add few numbers to the counter and the game will skip some questions 
1. **Solution found:**  
    Deactivate the buttons after the user's first click solve the problem. Then adding a timeout to activate the buttons again for the user's next question
    ![](./bugs/bug-7.png)   

### Bug #8    

1.  **Give Short bug description:**  
    The warning message after the reset button at the end of the game page is clicked doesn't stay in the center of the screen
1.  **Steps to trigger the bug:**  
    1. Open the website https://ignaziosotgiu.github.io/trivia-quiz/  
    1. Click start  
    1. Choose a category
    1. Choose a difficulty level
    1. Answer all the questions
    1. After the last question is answered scroll down to the bottom of the page
    1. Click reset 
1. **Description of the unwanted behaviour:**  
    The warning message is not centered on the screen
    ![](./bugs/bug-8.png)
1. **Solution found:**  
    Give warning container position fixed will center the message.
     