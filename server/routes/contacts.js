/*\
File name:routes/contacts.js
Student name: Michael Gailling
Student ID: 822886651
Date: October 25, 2020
\*/

let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

//User model
let Contact = require('../models/contact');

let contactController = require("../controllers/contacts")

//GET contact list - READ
router.get('/', contactController.displayContactList);

//GET Route for displaying add Contact Page - CREATE
router.get('/add',contactController.displayAddContact);

//POST Route for adding new Contact to db - CREATE
router.post('/add', contactController.addContact);

//GET Route for displaying edit Contact Page - UPDATE
router.get('/edit/:id', contactController.displayEditContact);

//POST Route for editing a Contact in db - UPDATE
router.post('/edit/:id', contactController.editContact);

//GET Route for performing a Contact delete - DELETE
router.get('/delete/:id', contactController.deleteContact);

module.exports = router;