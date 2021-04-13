/*jshint esversion: 6 */
// connecting the contact email with my gmail account using emailJs
// code from code institute and EmailJS website tutorials
function sendMail() {
    emailjs.send("service_crlz8af","triviaquiz",{
        "from_name": document.getElementById("contact-name").value,
        "enquiry": document.getElementById("contact-enquiry").value,
        "from_email": document.getElementById("contact-email").value
    })
    .then (
        function(response) {
            console.log("success", response);
            messageSuccess();
        },
        function(error) {
            console.log("error", error);
            messageError();
        });
}
let contactBtn = document.getElementById("contact-submit-btn");
contactBtn.addEventListener("click", checkForm);

function checkForm(event) {
    event.preventDefault();
    let contactName = document.getElementById("contact-name").value;
    let contactEmail = document.getElementById("contact-email").value;
    let contactEnquiry =document.getElementById("contact-enquiry").value;
    let validEmail = validateEmail(contactEmail);
    if(contactName && validEmail && contactEnquiry) {
        sendMail();
    } else {
        messageMissingField(contactName, validEmail, contactEnquiry);
    }
}

/************function taken from stack overflow*********** */
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function messageMissingField(contactName, validEmail, contactEnquiry) {
    if(!contactName){
        $(".swal-overlay").css("display", "block");
        swal({
            title: "Error!",
            icon: "info",
            text: `Please enter your name`,
            button: "OK",
        });
    } else if(!validEmail) {
        $(".swal-overlay").css("display", "block");
        swal({
            title: "Error!",
            icon: "info",
            text: `Please enter a valid email address`,
            button: "OK",
        });
    } else {
        $(".swal-overlay").css("display", "block");
        swal({
            title: "Error!",
            icon: "info",
            text: `Please enter a message`,
            button: "OK",
        });
    }
}

function messageSuccess() {
    $(".swal-overlay").css("display", "block");
    swal({
        title: "Success!",
        icon: "success",
        text: `Your email has been sent`,
        button: "OK",
    });
    setTimeout(function(){
        $(".swal-overlay").css("display", "none");
        $("#contact-modal").css("display", "none");
        $("#registration-modal").css("display", "none");
    }, 3000);
}

function messageError() {
    $(".swal-overlay").css("display", "block");
    swal({
        title: "Error!",
        icon: "error",
        text: `there was a problem! Your email has not been sent`,
        button: "OK",
    });
    setTimeout(function(){
        $(".swal-button, .swal-overlay").css("display", "none");
    }, 3000);
}


//******sending email with details for registration to Newsletter****** */
let registrationBtn = document.getElementById("registration-submit-btn");
registrationBtn.addEventListener("click", checkRegistrationForm);

function checkRegistrationForm(event) {
    event.preventDefault();
    let registrationName = document.getElementById("registration-name").value;
    let registrationEmail = document.getElementById("registration-email").value;
    let validRegistrationEmail = validateEmail(registrationEmail);
    let newsletter = document.getElementById("newsletter").checked;

    if(registrationName && validRegistrationEmail && newsletter) {
        sendRegistrationMail();
    } else {
        messageMissingRegistrationField(registrationName, validRegistrationEmail, newsletter);
    }
}

function messageMissingRegistrationField(registrationName, validRegistrationEmail, newsletter) {
    if(!registrationName){
        $(".swal-overlay").css("display", "block");
        swal({
            title: "Error!",
            icon: "info",
            text: `Please enter your name`,
            button: "OK",
        });
    } else if(!validRegistrationEmail) {
        $(".swal-overlay").css("display", "block");
        swal({
            title: "Error!",
            icon: "info",
            text: `Please enter a valid email address`,
            button: "OK",
        });
    } else {
        $(".swal-overlay").css("display", "block");
        swal({
            title: "Error!",
            icon: "info",
            text: `Please tick the Newsletter box before submitting`,
            button: "OK",
        });
    }
}

function sendRegistrationMail() {
    emailjs.send("service_crlz8af","template_ibq6on3",{
        "from_name": document.getElementById("registration-name").value,
        "from_email": document.getElementById("registration-email").value,
    })
    .then (
        function(response) {
            console.log("success", response);
            messageSuccess();
        },
        function(error) {
            console.log("error", error);
            messageError();
        });
}
    