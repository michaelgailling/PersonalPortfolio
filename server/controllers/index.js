let express = require('express');
let router = express.router;

module.exports.displayHomePage = (req,res,next) => {
    res.render('home/index', { title: 'Home' });
}

module.exports.displayAboutPage = (req,res,next) => {
    res.render('home/about', { title: 'About' });
}

module.exports.displayProjectsPage = (req,res,next) => {
    res.render('home/projects', { title: 'Projects' });
}

module.exports.displayServicesPage = (req,res,next) => {
    res.render('home/services', { title: 'Services' });
}

module.exports.displayContactPage = (req,res,next) => {
    res.render('home/contact', { title: 'Contact' });
}