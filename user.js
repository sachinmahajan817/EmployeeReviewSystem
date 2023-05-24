// IMPORT THE MODULES
const express = require("express");
const passport = require("passport");
const router = express.Router();

// IMPORT THE USER CONTROLLERS
const UserController = require("../controllers/UserController");

// ROUTES FOR /users/login
router.get("/login", UserController.login);

// ROUTES FOR /users/SignUp
router.get("/SignUp", UserController.signup);

// ROUTES FOR /users/SignOut
router.get("/SignOut", passport.checkAuthentication, UserController.signout);

// ROUTES FOR /users/create
router.post("/create", UserController.CreateUser);

//use passport as a middleware for authenication
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  UserController.CreateSession
);

module.exports = router;
