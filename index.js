// IMPORT THE MODULES
const express = require('express');
const router = express.Router();

console.log("Router files is loading..........")

// IMPORT THE USER CONTROLLERS
const UserController = require('../controllers/UserController');

// ROUTES FOR HOMEPAGE
router.get('/',UserController.home);

// ROUTES FOR /users
router.use("/users", require("./user"));

// ROUTES for /admin
router.use("/admin",require('./admin'));

// ROUTES FOR /review
router.use("/review",require('./review'));

module.exports = router;