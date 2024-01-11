const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const AdminUser = mongoose.model('admin', adminUserSchema);

module.exports = AdminUser;

