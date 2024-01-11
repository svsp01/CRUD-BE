const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdminUser = require('../model/AdminUser');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const adminUser = await AdminUser.findOne({ email, password });

        if (adminUser) {
            const token = jwt.sign({ userId: adminUser._id }, 'your_secret_key');

            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error authenticating admin user:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/add', async (req, res) => {
    const data = req.body;
    console.log(data, "fdsasfaw");

    if (data.email && data.password) {
        try {
            const newUser = await AdminUser.create({
                email: data.email,
                password: data.password,
            });

            res.status(200).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Invalid data');
    }
});
module.exports = router;
