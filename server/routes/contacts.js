let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

//User model
let Contact = require('../models/contact');

//Get contact list
router.get('/', (req, res, next)=>{
    Contact.find();
})