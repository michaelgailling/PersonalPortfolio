let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

//User model
let Contact = require('../models/contact');

//GET contact list - READ
router.get('/', (req, res, next)=>{
    Contact.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(contactList);

            res.render('contact/list',{title: 'Contact List', ContactList: contactList});
        }
    });
});

//GET Route for displaying add Contact Page - CREATE
router.get('/add',(req,res, next)=>{
    res.render('contact/add', {title: 'Add Contact'});
});

//POST Route for adding new Contact to db - CREATE
router.post('/add',(req,res, next)=>{
    let newContact = Contact({
        "name": req.body.name,
        "email":req.body.email,
        "phone":req.body.phone
    });

    Contact.create(newContact, (err, Contact) =>{
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
});

//GET Route for displaying edit Contact Page - UPDATE
router.get('/edit/:id',(req,res, next)=>{
    let id = req.params.id;

    Contact.findById(id, (err, currentContact) =>{
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            res.render('contact/edit', {title: "Edit Contact", contact: currentContact});
        }
    });
});

//POST Route for editing a Contact in db - UPDATE
router.post('/edit/:id',(req,res, next)=>{
    let id = req.params.id;

    let updatedContact = Contact({
        "_id": id,
        "name": req.body.name,
        "email":req.body.email,
        "phone":req.body.phone
    });

    Contact.updateOne({_id:id}, updatedContact, (err)=>{
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
});

//GET Route for performing a Contact delete - DELETE
router.get('/delete/:id',(req,res, next)=>{
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
});

module.exports = router;