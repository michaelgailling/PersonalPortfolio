let express = require('express');
let router = express.Router;

//DB and authentication
let mongoose = require('mongoose');
let passport = require('passport');

//User model
let userModel = require('../models/user');
let User = userModel.User;

//Display home page
module.exports.displayHomePage = (req,res,next) => {
    res.render('home/index', { title: 'Home',
    displayName : req.user ? req.user.displayName : '' });
}

//Display about page
module.exports.displayAboutPage = (req,res,next) => {
    res.render('home/about', { title: 'About',
    displayName : req.user ? req.user.displayName : '' });
}

//Display projects page
module.exports.displayProjectsPage = (req,res,next) => {
    res.render('home/projects', { title: 'Projects',
    displayName : req.user ? req.user.displayName : '' });
}

//Display services page
module.exports.displayServicesPage = (req,res,next) => {
    res.render('home/services', { title: 'Services',
    displayName : req.user ? req.user.displayName : '' });
}

//Display contact page
module.exports.displayContactPage = (req,res,next) => {
    res.render('home/contact', { title: 'Contact',
    displayName : req.user ? req.user.displayName : '' });
}

//Display login page
module.exports.displayLoginPage = (req,res,next) => {
    //Check for logged in user
    if(!req.user)
    {
        //If not logged in display login view
        res.render('auth/login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName : req.user ? req.user.displayName : ''
        });
    }
    //If logged in redirect to contact list
    return res.redirect('/contact-list');
}

//Process login request
module.exports.procLoginPage = (req,res,next) => {
    //Authenticate with passport
    passport.authenticate('local', (err,user, info) => {
        if(err)
        {
            return next(err);
        }
        //If login fails redirect to login view with error message
        if(!user)
        {
            req.flash('loginMessage', "Authentication Error");
            return res.redirect('/login');
        }
        //Return redirect to contact-list when login succeeds
        req.login(user, (err)=>{
            if(err)
            {
                return next(err);
            }

            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

//Display register page
module.exports.displayRegisterPage = (req,res,next) => {
    //Check for logged in user
    if(!req.user)
    {
        //If not logged in display register view
        res.render('auth/register', {
            title: 'Register',
            messages: req.flash('loginMessage'),
            displayName : req.user ? req.user.displayName : ''
        });
    }
    //If logged in redirect to home page
    return res.redirect('/');
}

//Process register page
module.exports.procRegisterPage = (req,res,next) => {
    //Defines new User object with from data
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    //Register user with passport passing password into parameters
    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            //If User object exists return an error message and reload registration page 
            if(err.name == "UserExistsError")
            {
                req.flash('registerMessage', 'Registration Error');
                console.log('User exists error.');
    
            }
            return res.redirect('/register');
        }
        else
        {
            //If user is created successfully redirect to login
            return passport.authenticate('local')(req,res, ()=>{
                res.redirect('/login');
            });
        }
        
    })
}

//Process logout request
module.exports.procLogout = (req,res,next) => {
    //Log user out
    req.logout();
    //Redirect tot home page
    res.redirect('/login');
}