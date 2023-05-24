// IMPORT THE DATABASES'S COLLECTIONS
const User = require("../models/user");
const Review = require('../models/review');

// ASSIGN TASK PAGE SENDS WITH ALL EMPLOYEENAME
module.exports.assignTask = async function(req,resp){

    try
    {
        if(!req.isAuthenticated() || req.user.isAdmin == false) {
            return resp.redirect("/");
        }

        let users = await User.find({});
       
        return resp.render("assign_task", {users});
    }
    catch(error){

          console.log(`Error during assign task page :  ${error}`);
          resp.redirect("back");
    }
}

// ON SUBMIT THE ASSIGN TASK 
module.exports.taskassigned = async function(req,resp){

     try {

       if (!req.isAuthenticated() || req.user.isAdmin == false) {
         return resp.redirect("/");
       }
       
       if(req.body.employee_name === req.body.reviewer_name)
       {
        
        req.flash("error", "TASK ASSIGN YOUSELF NOT ALLOWED");
        return resp.redirect("/admin/assigntask");
       }

       let to_employee = await User.findById(req.body.employee_name);
       let from_employee = await User.findById(req.body.reviewer_name);

       to_employee.evaluatefromother.push(from_employee);
       to_employee.save();

       from_employee.evaluatebyme.push(to_employee);
       from_employee.save();

      req.flash("success", "TASK ASSIGNED DONE...");
      console.log("Task assigned successfully");

      return resp.redirect('back');


     } catch (error) {

       console.log(`Error during assigned task :  ${error}`);
       resp.redirect("back");
     }

}

// SHOW ALL EMPLOYEES RECORDS AND SEND THE ALL EMPLOYEES
module.exports.EmployeeRecords = async function(req,resp){

    try{

       if (!req.isAuthenticated() || req.user.isAdmin == false) {
        return resp.redirect("/");
       }

        let users = await User.find({});

        return resp.render("employee_records", {users});

    } catch (error) {

       console.log(`Error during showing on all employee records :  ${error}`);
       resp.redirect("back");
    }
}

// ADD THE EMPLOYEE FROM ADMIN FORM PAGE
module.exports.AddUser = async function(req,resp){

    try {

      if (!req.isAuthenticated() || req.user.isAdmin == false) {
        return resp.redirect("/");
      }

      return resp.render("addUser");

    }catch (error) {

      console.log(`Error during addemployee page from admin :  ${error}`);
      resp.redirect("back");

    }
}

// ADD THE EMPLOYEE FROM ADMIN
module.exports.CreateUser = async function (req, resp) {
  try {

     if (!req.isAuthenticated() || req.user.isAdmin == false) {
       return resp.redirect("/");
     }

    if (req.body.password != req.body.confirmpassword) {

      req.flash("error", "PASSWORD DOESNOT MATCH");
      return resp.redirect("back");

    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const newuser = await User.create({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
      });

      await newuser.save();

      if (!newuser) {
        console.log("error in creating new employee");
        return resp.redirect("back");
      }
      
      req.flash("success", "EMPLOYEE ADDED DONE...");
      console.log("Employee added successfully from admin");

      return resp.redirect("/admin/employeerecords");

    } else {

      req.flash("error", "E-MAIL ALREADY ADDED");
      return resp.redirect("back");
    }
  } catch (error) {

    console.log(`Error during creating an employee from admin:  ${error}`);
    resp.redirect("back");
  }
};

// VIEW THE STUDENT FROM ADMIN
module.exports.ViewEmployee = async function(req,resp){

    
     try {
       if (!req.isAuthenticated() || req.user.isAdmin == false) {
         return resp.redirect("/");
       }

       let user = await User.findById(req.params.id);

       return resp.render("viewEmployee", { user });

     } catch (error) {

       console.log(`Error during view an employee :  ${error}`);
       resp.redirect("back");
     }

}

// EDIT FORM ON EDIT WITH AUTOFILL DATA
module.exports.UpdateReqUser = async function(req,resp){

     try {

       if (!req.isAuthenticated() || req.user.isAdmin == false) {
         return resp.redirect("/");
       }

       let user = await User.findById(req.params.id);

       return resp.render("update_employee", { user });

     } catch (error) {

       console.log(`Error during update form from admin :  ${error}`);
       resp.redirect("back");

     }
}

// UPDATE SUBMIT SAVE THE UPDATED  EMPLOYEE DATA
module.exports.UpdatedUser = async function(req,resp){

    try {

         if (!req.isAuthenticated() || req.user.isAdmin == false) {
           return resp.redirect("/");
         }

        let user = await User.findById(req.params.id);
       
         user.name=req.body.name;
         user.password=req.body.password;
         user.isAdmin = req.body.admin;

         user.save();

         req.flash("success", "UPDATE DONE...");
        console.log("Employee's details are updated successfully...");

         return resp.redirect("/admin/employeerecords");
     
    }catch(error) {

      console.log(`Error during updating the employee records :  ${error}`);
      resp.redirect("back");

    }
}

// DELETE THE EMPLOYEE DATA FROM ADMIN
module.exports.deleteEmployee = async function(req,resp){

    try{

       if (!req.isAuthenticated() || req.user.isAdmin == false) {
         return resp.redirect("/");
       }

      let id = req.params.id;

      let allusers = await User.find({});

      for(let i=0;i<allusers.length;i++){

        let index = await allusers[i].evaluatebyme.indexOf(id);

        if(index!==-1){
            while(index!=-1){
                  await allusers[i].evaluatebyme.splice(index,1);
                  index = allusers[i].evaluatebyme.indexOf(id);
            }
            await allusers[i].save();
        }

        index = await allusers[i].evaluatefromother.indexOf(id);

        if (index !== -1) {
          while (index != -1) {
            await allusers[i].evaluatebyme.splice(index, 1);
            index = allusers[i].evaluatebyme.indexOf(id);
          }
          await allusers[i].save();
        }

      }

      let reviews = await Review.find({from:id});
      for (let i = 0; i < reviews.length; i++) {
        await Review.findByIdAndDelete(reviews[i].id);
      }

      reviews = await Review.find({ for: id });
      for (let i = 0; i < reviews.length; i++) {
        await Review.findByIdAndDelete(reviews[i].id);
      }

      await User.findByIdAndDelete(id);

      req.flash("error", "DELETE AN EMPLOYEE DONE...");
      console.log("Employee's are deleted successfully...");

      return resp.redirect("/admin/employeerecords");


    }catch(error){

       console.log(`Error during deleting an employee :  ${error}`);
       resp.redirect("back");

    }

}
// MAKE AN EMPLOYEE TO ADMIN
module.exports.makeadmin = async function(req,resp){

    try {

        if (!req.isAuthenticated() || req.user.isAdmin == false) {
            return resp.redirect("/");
        }

        let user = await User.findById(req.body.admin_employee_name);

        if (user.isAdmin == true) {

          req.flash("error", "ALREADY ADMIN POWER ...");
          return resp.redirect("back");
        } else {
          user.isAdmin = true;
          await user.save();
        }

        req.flash("success", "ADMIN POWER TRANSFER DONE...");
        console.log("employee make admin successfully...");
        
        return resp.redirect("back");

    } catch (error) {

      console.log(`Error during making an employee to admin :  ${error}`);
      resp.redirect("back");

    }

}