// IMPORT THE DATABASE'S COLLECTIONS
const User = require('../models/user');
const Review = require('../models/review');

// HOMEPAGE AFTER LOGIN
module.exports.home = async function(req,resp){

    
    if (!req.isAuthenticated()) {
        return resp.redirect("/users/login");
    }

    let user = await User.findById(req.user._id);
    let to_review=[];

     for (let i = 0; i < user.evaluatebyme.length; i++) {
       let data = await User.findById(user.evaluatebyme[i]);
       to_review.push(data);
     }
    

     let all_review = await Review.find({
       for:req.user._id,
      });
     let my_review=[];


     for (let i = 0; i < all_review.length; i++) {
       let reviewername = await User.findById(all_review[i].from);
       let data = {
         reviewer_name: reviewername.name,
         review: all_review[i].review,
         lastupdate:all_review[i].updatedAt,
       };

       my_review.push(data);
     }

    return resp.render("home",{to_review,my_review});
}

// SIGIN PAGE
module.exports.login = function(req,resp){

    if (!req.isAuthenticated()) {
        return resp.render("sigin");
    }

    return resp.redirect('/');
}

// SIGIN UP
module.exports.signup = function(req,resp){

    if (!req.isAuthenticated()) {
        return resp.render("signup");
    }

     return resp.redirect("/");
}

// CREATE USER FROM SIGNUP PAGE
module.exports.CreateUser = async function(req,resp){

    try{

        if(req.body.password != req.body.confirmpassword){
            req.flash("error", "Password doesn't match..Renter..");
            return resp.redirect('back');
        }

        const user = await User.findOne({email:req.body.email});

        if (!user) {
          const newuser = await User.create({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false,
          });
          await newuser.save();

          if (!newuser) {
            console.log("error in creating new user");
            return resp.redirect("back");
          }
          return resp.redirect("/users/login");
        }
        else{
          req.flash("error", "E-Mail ID Already present");
          return resp.redirect("back");
        }
    }catch(error){
         console.log(`Error during submit the sigup form:  ${error}`);
        resp.redirect('back');
    }
    
}

// SESSION IS CREATE AFTER SUCCESSFULLY LOGIN
module.exports.CreateSession = function(req,resp)
{ 
    req.flash("success", "Yayy !!! Logged In Successfully");
    return resp.redirect("/");
}

// SIGNOUT
module.exports.signout = function (req, res) {

  req.flash("success", "Ooops !!! Logged Out Successfully");
  req.logout();
  return res.redirect("/");

};