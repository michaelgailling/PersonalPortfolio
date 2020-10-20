let mongoose = require('mongoose');

let Contact = mongoose.Schema
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
        collection : 'contacts'
    }
)