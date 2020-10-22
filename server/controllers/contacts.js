let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let passport = require('passport');



//Models
let Contact = require('../models/contact');


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
            //console.log(contactList);

            res.render('contact/list',{title: 'Contact List', ContactList: contactList,
            displayName : req.user ? req.user.displayName : ''});
        }
    });

}

module.exports.displayAddContact = (req,res,next) => {
    if(!req.user)
    {
        req.flash('loginMessage', "Unauthorized Access, Please log in!");
        return res.redirect('/login');
    }
    res.render('contact/add', {title: 'Add Contact',
    displayName : req.user ? req.user.displayName : ''});
};

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