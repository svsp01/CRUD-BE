const express = require('express');
const router = express.Router();
const Employee = require('../model/Employee');

router.get('/list', async (req, res) => {

});

router.get('/:id', async (req, res) => {
    const empId = req.params.id;

    try {
        const employee = await Employee.findOne({ empId });

        if (employee) {
            res.json(employee);
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.put('/:id', async (req, res) => {
    const empId = req.params.id;
    const data = req.body;

    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { empId },
            { $set: data },
            { new: true }
        );

        if (updatedEmployee) {
            res.status(200).json(updatedEmployee);
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add', async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        const newEmployee = await Employee.create(data);
        res.status(200).json(newEmployee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    const empId = req.params.id;

    try {
        const deletedEmployee = await Employee.findOneAndDelete({ empId });

        if (deletedEmployee) {
            res.status(200).json(deletedEmployee);
        } else {
            res.status(404).send('Employee not found');
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
