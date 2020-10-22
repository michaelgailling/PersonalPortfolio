let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let Model = mongoose.model;

let contactModel = Schema
(
    {
        name:
        {
            type: String,
            default:"",
            trim: true,
            required: "Name is required..."
        },
        email:
        {
            type: String,
            default:"",
            trim: true,
            required: "Email is required..."
        },
        phone:
        {
            type: String,
            default:"",
            trim: true,
            required: "Phone number is required..."
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
        collection : 'contacts'
    }
);

module.exports = Model('Contact', contactModel);