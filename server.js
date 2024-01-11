// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');


// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/users')
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((err) => {
//         console.error('Error connecting to MongoDB:', err);
//     });


// const userSchema = new mongoose.Schema({
//     email: String,
//     password: String,
// });

// const User = mongoose.model('User', userSchema);


// const adminConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/admin');

// const adminUserSchema = new mongoose.Schema({
//     username: String,
//     password: String,
// });

// const AdminUser = adminConnection.model('user', adminUserSchema);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// app.get('/users', async (req, res) => {
//     console.log("fdsassdsdfaw");

//     try {
//         const users = await User.find();
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/addusers', async (req, res) => {
//     const data = req.body;
//     console.log(data, "fdsasfaw");

//     if (data.email && data.password) {
//         try {
//             const newUser = await User.create({
//                 email: data.email,
//                 password: data.password,
//             });

//             res.status(200).json(newUser);
//         } catch (error) {
//             console.error('Error creating user:', error);
//             res.status(500).send('Internal Server Error');
//         }
//     } else {
//         res.status(400).send('Invalid data');
//     }
// });



// app.get('/users/:id', async (req, res) => {
//     const id = req.params.id;

//     try {
//         const user = await User.findById(id);

//         if (user) {
//             res.json(user);
//         } else {
//             res.status(404).send('User not found');
//         }
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.put('/users/:id', async (req, res) => {
//     const id = req.params.id;
//     const data = req.body;

//     if (data.email && data.password) {
//         try {
//             const user = await User.findByIdAndUpdate(
//                 id,
//                 { email: data.email, password: data.password },
//                 { new: true }
//             );

//             if (user) {
//                 res.status(200).json(user);
//             } else {
//                 res.status(404).send('User not found');
//             }
//         } catch (error) {
//             console.error('Error updating user:', error);
//             res.status(500).send('Internal Server Error');
//         }
//     } else {
//         res.status(400).send('Invalid data');
//     }
// });

// app.delete('/users/:id', async (req, res) => {
//     const id = req.params.id;

//     try {
//         const deletedUser = await User.findByIdAndDelete(id);

//         if (deletedUser) {
//             res.status(200).json(deletedUser);
//         } else {
//             res.status(404).send('User not found');
//         }
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/admin/login', async (req, res) => {
//     const { email, password } = req.body;
//     console.log(email, "useremail")
//     console.log(password, "userpassword")


//     try {
//         const adminUser = await AdminUser.findOne({ email, password });
//         console.log(adminUser, "user")

//         if (adminUser) {
//             const token = jwt.sign({ userId: adminUser._id }, 'your_secret_key');

//             res.status(200).json({ token });
//         } else {
//             res.status(401).json({ message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         console.error('Error authenticating admin user:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employees');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/users')
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

