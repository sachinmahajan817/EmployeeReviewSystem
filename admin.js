// IMPORT THE MODULES
const express = require("express");
const passport = require("passport");
const router = express.Router();

// IMPORT THE ADMIN CONTROLLER
const AdminController = require('../controllers/AdminController');

// ROUTES for /admin/assigntask
router.get("/assigntask", passport.checkAuthentication,AdminController.assignTask);

// ROUTES for /admin/taskassigned
router.post("/taskassigned",passport.checkAuthentication,AdminController.taskassigned);

// ROUTES for /admin/employeerecords
router.get("/employeerecords",passport.checkAuthentication,AdminController.EmployeeRecords);

// ROUTES for /admin/adduser
router.get("/adduser",passport.checkAuthentication,AdminController.AddUser);

// ROUTES for /adminupdate/<id>
router.get("/update/:id", passport.checkAuthentication, AdminController.UpdateReqUser);

// ROUTES for /admin/UpdatedUser/<id>
router.post("/UpdatedUser/:id",passport.checkAuthentication, AdminController.UpdatedUser);

// ROUTES for /admin/create_user
router.post("/create_user",passport.checkAuthentication, AdminController.CreateUser);

// ROUTES for /admin/view/<id>
router.get("/view/:id",passport.checkAuthentication, AdminController.ViewEmployee);

// ROUTES for /admin/delete/<id>
router.get("/delete/:id", passport.checkAuthentication, AdminController.deleteEmployee);

// ROUTES for /admin/makeadmin
router.post("/makeadmin",passport.checkAuthentication, AdminController.makeadmin);



module.exports = router;