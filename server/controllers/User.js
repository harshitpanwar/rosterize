const User = require('../models/User');
const brcypt = require('bcryptjs');

module.exports = {
    getUser: async(req, res) => {

        const user_id = req.params.user_id;
        const user = await User.findById(user_id);

        if(req.user.role !== 'superadmin' && req.user._id.toString() !== user_id) {
            return res.status(403).send('Unauthorized');
        }

        if (!user) {
            res.status(404).send('User not found')
        } else {
            res.send(user);
        }

    },
    createUser: async(req, res) => {

        try {
            const { firstName, lastName, email, companyRole, department, phoneNo, role } = req.body;
            console.log(req.body);
            if(!firstName || !email || !companyRole || !department) {
                return res.status(400).send('All fields are required');
            }

            const tempPassword = 'password';
            const hashedPassword = brcypt.hashSync(tempPassword, 10);
    
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role,
                companyRole,
                department,
                phoneNo,
                company: req.user.company,
                status: 'active'
            });
    
            const savedUser = await newUser.save();
    
            if (!savedUser) {
                res.status(500).send('Error saving user')
            }
            res.send(savedUser);
    
        } catch (error) {
            res.status(500).send(error.message || 'Error saving user')
            
        }
    },
    putUser: async(req, res) => {
        res.send('Put User')
    },
    deleteUser: async(req, res) => {
        try {
            const user_id = req.params.user_id;
            const user = await User.findByIdAndDelete(user_id);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.send(user);
            }
        } catch (error) {
            res.status(500).send(error.message || 'Error deleting user');
        }
    },
    me: async(req, res) => {
        try {
            const user = await User.findById(req.user.id);
            
            if (!user) {
                return res.status(400).send({ error: 'User not found' });
            }
            user.password = undefined;
            res.send({
                token: req.header('Authorization').replace('Bearer ', ''),
                user
            });
        }
        catch (err) {
            return res.status(401).send({ error: 'User not found' });
        }
    },
    list: async(req, res) => {
        try {
            const users = await User.find({ 
                company: req.user.company, 
                status: 'active',
                // departmenthead and user
                role: { $in: ['departmenthead', 'user'] }
            }).populate('companyRole').populate('department');
            res.send(users);
        } catch (error) {
            res.status(500).send('Error fetching users');
        }
    }

}