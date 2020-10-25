/*\
File name:controllers/contacts.js
Student name: Michael Gailling
Student ID: 822886651
Date: October 25, 2020
\*/

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let passport = require('passport');



//Models
let Contact = require('../models/contact');

//Display Contact List
module.exports.displayContactList = (req, res, next)=> {
    console.log('contact list proced');
    if(!req.user)
    {
        req.flash('loginMessage', "Unauthorized Access, Please log in!");
        return res.redirect('/login');
    }
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //Sort contact list pass in anonymous sorting fucntion to sort alphabetically
            contactList = contactList.sort((contactA, contactB) => {
                //The name value of each contact is force to lower case then stored for comparison
                let a = contactA.name.toLowerCase();
                let b = contactB.name.toLowerCase();
                if(a<b){
                    //if A value comes before B value in the alpabet reduce its index by 1 in the array
                    return -1;
                }
                else{
                    //if A value comes after B value in the alpabet increase its index by 1 in the array
                    return 1;
                }
            });
            res.render('contact/list',{title: 'Contact List', ContactList: contactList,
            displayName : req.user ? req.user.displayName : ''});
        }
    });

}

//Display add contact page
module.exports.displayAddContact = (req,res,next) => {
    if(!req.user)
    {
        req.flash('loginMessage', "Unauthorized Access, Please log in!");
        return res.redirect('/login');
    }
    res.render('contact/add', {title: 'Add Contact',
    displayName : req.user ? req.user.displayName : ''});
};

//Process add contact request
module.exports.addContact = (req,res,next) => {
    let newContact = Contact({
        "name": req.body.name,
        "email":req.body.email,
        "phone":req.body.phone
    });

    Contact.create(newContact, (err, Contact) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact-list');
        }
    });
};

//Display edit contact page
module.exports.displayEditContact = (req,res,next) => {
    if(!req.user)
    {
        req.flash('loginMessage', "Unauthorized Access, Please log in!");
        return res.redirect('/login');
    }

    let id = req.params.id;

    Contact.findById(id, (err, currentContact) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.render('contact/edit', {title: "Edit Contact", contact: currentContact,
            displayName : req.user ? req.user.displayName : ''});
        }
    });
};

//Process edit contact request
module.exports.editContact = (req,res, next) => {
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "email":req.body.email,
        "phone":req.body.phone
    });

    Contact.updateOne({_id:id}, updatedContact, (err )=> {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact-list');
        }
    });
}

//Process delete contact request
module.exports.deleteContact = (req,res, next) => {
    if(!req.user)
    {
        req.flash('loginMessage', "Unauthorized Access, Please log in!");
        return res.redirect('/login');
    }

    let id = req.params.id;

    Contact.remove({_id:id}, (err)=>{
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.redirect('/contact-list');
        }
    });
}