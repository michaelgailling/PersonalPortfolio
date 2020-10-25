/*\
File name:config/app.js
Student name: Michael Gailling
Student ID: 822886651
Date: October 25, 2020
\*/


//3rd Party Packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//Auth Modules
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

//Auth objects
let localStrategy = passportLocal.Strategy;

// Module for messaging
let flash = require('connect-flash');

//Routers
let indexRouter = require('../routes/index');
let contactsRouter = require('../routes/contacts');

let app = express();

//DB setup
let mongoose = require('mongoose');
let DB = require('./db');

//DB connection
mongoose.connect(DB.URI,{useNewUrlParser: true,useUnifiedTopology: true})

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, "Connection error: "));
mongoDB.once('open', ()=>{
  console.log("Connected to mongoDB!");
});

//user model instance
let userModel = require('../models/user');
let User = userModel.User;

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
let Auth = require('./auth');

app.use(session({
  secret: Auth.Secret,
  saveUninitialized: false,
  resave: false
}));

//setup flash-connect
app.use(flash());

//setup passport
app.use(passport.initialize());
app.use(passport.session());

//implement auth strategy
passport.use(User.createStrategy());

//Serialize/Deserialize User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Main route definitons
app.use('/', indexRouter);
app.use('/contact-list', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title:"Error"});
});

module.exports = app;
