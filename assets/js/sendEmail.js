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
            //alert("Your email has been sent");
        },
        function(error) {
            console.log("error", error);
            alert(" Error Your email has not been sent");

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
        $(".swal-button, .swal-overlay").css("display", "block");
        swal({
            title: "Success!",
            icon: "success",
            text: `Your email has been sent`,
            button: "OK",
        });
        setTimeout(function(){
            $(".swal-button, .swal-overlay").css("display", "none");
            $("#contact-modal").css("display", "none");
        }, 2000);
         
    } else {
        if(!contactName){
            $(".swal-button, .swal-overlay").css("display", "block");
            swal({
                title: "Error!",
                icon: "info",
                text: `Please enter your name`,
                button: "OK",
            });
        } else if(!contactEmail) {
            $(".swal-button, .swal-overlay").css("display", "block");
            swal({
                title: "Error!",
                icon: "info",
                text: `Please enter a valid email address`,
                button: "OK",
            });
        } else {
            $(".swal-button, .swal-overlay").css("display", "block");
            swal({
                title: "Error!",
                icon: "info",
                text: `Please enter a message`,
                button: "OK",
            });
        }

    }
}
function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    