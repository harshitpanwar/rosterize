const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userExists = await User.findOne({ email });
            if (!userExists) {
                return res.status(400).send({ error: 'User not found' });
            }
            if (!await bcrypt.compare(password, userExists.password)) {
                return res.status(400).send({ error: 'Invalid password' });
            }
            userExists.password = undefined;
            const token = jwt.sign({ id: userExists._id, company: userExists.company, department: userExists.department }, process.env.TOKEN_SECRET, {
                expiresIn: 86400
            });
            res.send({ user: userExists, token });
        }
        catch (err) {
            return res.status(401).send({ error: err.message || 'Login failed' }); 
        }
        
    },
    async register(req, res) {
        try {
            const { email } = req.body;
            if (await User.findOne({ email })) {
                return res.status(400).send({ error: 'User already exists' });
            }
            const newUser = await User.create(req.body);
            newUser.password = undefined;
            const token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
                expiresIn: 86400
            });
            res.send({ newUser, token });
        }
        catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    }
}