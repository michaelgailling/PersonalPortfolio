/*\
File name:models/user.js
Student name: Michael Gailling
Student ID: 822886651
Date: October 25, 2020
\*/

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');


let Schema = mongoose.Schema;
let Model = mongoose.model;

let User = Schema
(
    {
        username:
        {
            type: String,
            default:"",
            trim: true,
            required: "Username is required..."
        },
        email:
        {
            type: String,
            default:"",
            trim: true,
            required: "Email is required..."
        },
        displayName:
        {
            type: String,
            default:"",
            trim: true,
            required: "Display name is required..."
        },
        created:
        {
            type: Date,
            default:Date.now
        },
        updated:
        {
            type: Date,
            default:Date.now
        }
    },
    {
        collection : 'users'
    }
)

//User model config
let options = ({missingPasswordError:"Incorrect Password"});

User.plugin(passportLocalMongoose, options);

module.exports.User = Model('User', User);