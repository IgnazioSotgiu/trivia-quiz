function sendEmail(enquiryForm) {
    emailjs.send("service_crlz8af","triviaquiz", {
        "from_name": enquiryForm.name.value,
        "from_email": enquiryForm.email.value,
        "enquiry": enquiryForm.subject.value

    })
    .then (
        function(response) {
            console.log("success", response);
        },
        function(error) {
            console.log("error", error);
        });

}