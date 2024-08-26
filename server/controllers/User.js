const User = require('../models/User');

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
    postUser: async(req, res) => {

        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password
        });

        const savedUser = await newUser.save();

        if (!savedUser) {
            res.status(500).send('Error saving user')
        }
        res.send(savedUser);

    },
    putUser: async(req, res) => {
        res.send('Put User')
    },
    deleteUser: async(req, res) => {
        res.send('Delete User')
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
    }

}