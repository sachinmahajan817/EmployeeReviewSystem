// IMPORT THE MODULES
const express = require("express");
const passport = require("passport");
const router = express.Router();


// IMPORT THE REVIEW CONTROLLERS
const ReviewController = require('../controllers/ReviewController');

// ROUTES FOR /review/create_review/<id>
router.post("/create_review/:id", passport.checkAuthentication,ReviewController.createReview);

// ROUTES FOR /review/reviewdata
router.get("/reviewdata",passport.checkAuthentication,ReviewController.reviewdata);

// ROUTES FOR /review/edit/<id>
router.get("/edit/:id",passport.checkAuthentication, ReviewController.editReview);

// ROUTES FOR /review/view/<id>
router.get("/view/:id",passport.checkAuthentication, ReviewController.viewdata);

// ROUTES FOR /review/updatedreview/<id>
router.post('/updatedreview/:id',passport.checkAuthentication, ReviewController.updateReview)

// ROUTES FOR /review/addreview
router.get('/addreview',passport.checkAuthentication, ReviewController.addReview);

// ROUTES FOR /review/addReviewfromadmin
router.post("/addReviewfromadmin",passport.checkAuthentication,ReviewController.addReviewfromadmin);



module.exports = router;