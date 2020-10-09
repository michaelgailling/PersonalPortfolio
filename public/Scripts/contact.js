/*\
File name:Scripts/contact.js
Student name: Michael Gailling
Student ID: 822886651
Date: October 7, 2020
\*/

//Simulates the contact form being submited
function simulateContact(){
    let form = document.getElementById("contactForm");
    let inputs = form.getElementsByClassName("form-control");
    let subject = inputs[0].value;
    let email = inputs[1].value;
    let comments = inputs[2].value;
    alert("Subject: " + subject + "\nEmail: " + email + " \nComments: " + comments);
}

