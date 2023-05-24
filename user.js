// EMPLOYEES DATABSE (ADMIN + EMPLOYEES) WITH NAME,EMAIL,PASSWORD,ADMIN OR NOT FIELDS

const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  evaluatebyme: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    }],
  evaluatefromother: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
    }],
},
{
    timestamps:true
});

const Employee = mongoose.model('Employee',EmployeeSchema);
module.exports = Employee;