let express = require('express');
let router = express.Router;

let mongoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req,res,next) => {
    res.render('home/index', { title: 'Home',
    displayName : req.user ? req.user.displayName : '' });
}

module.exports.displayAboutPage = (req,res,next) => {
    res.render('home/about', { title: 'About',
    displayName : req.user ? req.user.displayName : '' });
}

module.exports.displayProjectsPage = (req,res,next) => {
    res.render('home/projects', { title: 'Projects',
    displayName : req.user ? req.user.displayName : '' });
}

module.exports.displayServicesPage = (req,res,next) => {
    res.render('home/services', { title: 'Services',
    displayName : req.user ? req.user.displayName : '' });
}

module.exports.displayContactPage = (req,res,next) => {
    res.render('home/contact', { title: 'Contact',
    displayName : req.user ? req.user.displayName : '' });
}

module.exports.displayLoginPage = (req,res,next) => {
    if(!req.user)
    {
        res.render('auth/login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName : req.user ? req.user.displayName : ''
        });
    }
    return res.redirect('/contact-list');
}

module.exports.procLoginPage = (req,res,next) => {

    passport.authenticate('local', (err,user, info) => {
        if(err)
        {
            return next(err);
        }

        if(!user)
        {
            req.flash('loginMessage', "Authentication Error");
            return res.redirect('/login');
        }

        req.login(user, (err)=>{
            if(err)
            {
                return next(err);
            }

            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req,res,next) => {
    if(!req.user)
    {
        res.render('auth/register', {
            title: 'Register',
            messages: req.flash('loginMessage'),
            displayName : req.user ? req.user.displayName : ''
        });
    }
    return res.redirect('/');
}

module.exports.procRegisterPage = (req,res,next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                req.flash('registerMessage', 'Registration Error');
                console.log('User exists error.');
    
            }
            return res.redirect('/register');
        }
        else
        {
            return passport.authenticate('local')(req,res, ()=>{
                res.redirect('/login');
            });
        }
        
    })
}

module.exports.procLogout = (req,res,next) => {
    req.logout();
    res.redirect('/login');
}