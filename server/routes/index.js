let express = require('express');
let router = express.Router();

let indexController = require("../controllers/index");

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);

//GET Route for displaying add Login Page
router.get('/login',indexController.displayLoginPage);

//POST Route for processing login page
router.post('/login', indexController.procLoginPage);

//GET Route for displaying add Login Page
router.get('/register',indexController.displayRegisterPage);

//POST Route for processing login page
router.post('/register', indexController.procRegisterPage);

//GET Logout User
router.get('/logout', indexController.procLogout);

module.exports = router;
