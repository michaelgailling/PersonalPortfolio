/*\
File name:Scripts/app.js
Student name: Michael Gailling
Student ID: 822886651
Date: October 7, 2020
\*/

(function(){
    function Start()
    {
        console.log("APP STARTED...");
        let deleteButtons = document.querySelectorAll('.btn-danger');

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?"))
                {
                    event.preventDefault();
                    window.location.assign("/contact-list")
                }
            });
        }
    }

    window.addEventListener("load", Start);

})()