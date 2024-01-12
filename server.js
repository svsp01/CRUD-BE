const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employees');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/users')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use('/admin', adminRoutes);
app.use('/users', employeeRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

