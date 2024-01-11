const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
});

const employeeSchema = new mongoose.Schema({
    name: nameSchema,
    email: String,
    empId: String,
    gender: String,
    dateOfBirth: Date,
    phoneNumber: String,
    department: String,
    position: String,
    salary: Number,
});


const Employee = mongoose.model('users', employeeSchema);

module.exports = Employee;
