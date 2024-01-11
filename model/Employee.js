const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String,
    },
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
