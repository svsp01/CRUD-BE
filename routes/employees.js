const express = require('express');
const router = express.Router();
const Employee = require('../model/Employee');

router.get('/list', async (req, res) => {
    try {
        const employee = await Employee.find();

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
    const _id = req.params.id
    let payload = req.body;

    try {
        let employee = await Employee.findOne({ _id });

        if (!employee) {
            res.status(404).json({
                status: false,
                message: "Employee not found",
            });
            return;
        }

        let updatedEmployee = await Employee.findOneAndUpdate(
            { _id: _id },
            { $set: payload },
            { new: true }
        );

        res.json({
            status: true,
            message: "Employee updated successfully",
            updatedEmployee,
        });
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
    const _id = req.params.id;
    console.log(_id)

    try {
        let employee = await Employee.findOne({ _id });

        if (!employee) {
            res.status(404).json({
                status: false,
                message: "Employee not found",
            });
            return;
        }

        const deletedEmployee = await Employee.findOneAndDelete({ _id });

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
