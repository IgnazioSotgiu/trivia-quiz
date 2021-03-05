// connecting the contact email with my gmail account using emailJs
// code from code institute and EmailJS website tutorials


function sendMail(enquiryForm) {
    emailjs.send("service_crlz8af","triviaquiz",{
        "from_name": document.getElementById("contact-name").value,
        "enquiry": document.getElementById("contact-enquiry").value,
        "from_email": document.getElementById("contact-email").value
    })
    .then (
        function(response) {
            console.log("success", response);
            alert("Your email has been sent");
        },
        function(error) {
            console.log("error", error);
            alert(" Error Your email has not been sent");

        });

}
let contactBtn = document.getElementById("contact-submit-btn");
contactBtn.addEventListener("click", function() {
    let contactName = document.getElementById("contact-name").value;
    let contactEmail = document.getElementById("contact-email").value;
    let contactEnquiry =document.getElementById("contact-enquiry").value;

    if(contactName && contactEmail && contactEnquiry) {
        sendMail(enquiryForm);
    } else {
        alert("Some fiels are not completed. Please complete the form.");

    }
});