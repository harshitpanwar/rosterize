const User = require('../models/User');
const brcypt = require('bcryptjs');
const ClockInOut = require('../models/ClockInOut');
const Status = require('../models/Status');
const Leave = require('../models/Leave');
const Review = require('../models/Review');

module.exports = {
    getUser: async(req, res) => {

        try {
            const user_id = req.params.user_id;
            const user = await User.findById(user_id).populate('companyRole').populate('department');
    
            if(req.user.role !== 'superadmin' && req.user.id.toString() !== user_id) {
                return res.status(403).send('Unauthorized');
            }
    
            if (!user) {
                res.status(404).send('User not found')
            } else {
                res.send(user);
            }
    
        } catch (error) {
            return res.status(500).send(error.message || 'Error fetching user');
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
    updateUser: async(req, res) => {
        try {

            const user_id = req.params.user_id;
            const { firstName, lastName, email, companyRole, department, phoneNo, role,
                emergencyContactName, emergencyContactNo, employeeId
             } = req.body;

            if(!firstName || !email || !companyRole || !department) {
                return res.status(400).send('All fields are required');
            }

            const user = await User.findById(user_id);
            if (!user) {
                return res.status(404).send('User not found');
            }

            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.companyRole = companyRole;
            user.department = department;
            user.phoneNo = phoneNo;
            user.role = role;
            user.emergencyContactName = emergencyContactName;
            user.emergencyContactNo = emergencyContactNo;
            user.employeeId = employeeId;
            user.updatedAt = new Date();

            const updatedUser = await user.save();
            if (!updatedUser) {
                return res.status(500).send('Error updating user');
            }
            res.send(updatedUser);
            
        } catch (error) {
            return res.status(500).send(error.message || 'Error updating user');
        }
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
    },
    clockin: async(req, res) => {
        try {
            
            const {clockInTime} = req.body;
            const user = await User.findById(req.user.id);

            console.log(clockInTime, user);
            if (!user) {
                return res.status(404).send('User not found');
            }
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const clockin = await ClockInOut.findOne({ 
                user: req.user.id, 
                createdAt: { $gte: today }
            });
            const clockIn = new Date();
            const [hours, minutes] = clockInTime.split(':');
            clockIn.setHours(parseInt(hours));
            clockIn.setMinutes(parseInt(minutes));
            clockIn.setSeconds(0);

            if (clockin) {
                clockin.clockIn = clockIn.toISOString();
                clockin.clockOut = null;
                await clockin.save();
            }
            else {
                const newClockin = new ClockInOut({
                    user: req.user.id,
                    company: req.user.company,
                    clockIn: clockIn.toISOString(),
                    clockOut: null
                });
                await newClockin.save();
            }
            res.send('Clocked in successfully');

        } catch (error) { 
            return res.status(500).send(error.message || 'Error clocking in');
        }
    },
    clockout: async(req, res) => {
        try {

            const {clockOutTime} = req.body;
            if(!clockOutTime) {
                return res.status(400).send('Clock out time is required');
            }
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).send('User not found');
            }
            // check if user has already clocked in for the day
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const clockin = await ClockInOut.findOne({ 
                user: req.user.id, 
                createdAt: { $gte: today }
            });
            // if user has already clocked in, set the current time as clock in time
            if (clockin.clockIn && !clockin.clockOut) {
                const clockOut = new Date();
                const [hours, minutes] = clockOutTime.split(':');
                clockOut.setHours(parseInt(hours));
                clockOut.setMinutes(parseInt(minutes));
                clockOut.setSeconds(0);
                clockin.clockOut = clockOut;
                await clockin.save();
                res.send('Clocked out successfully');
            }
            else {
                return res.status(400).send('You have not clocked in today');
            }
        } catch (error) {
            return res.status(500).send(error.message || 'Error clocking out');
        }
    },
    getclockInOutStatus: async(req, res) => {
        try {

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const clockin = await ClockInOut.findOne({ 
                user: req.user.id, 
                createdAt: { $gte: today }
            });

            if (clockin) {
                if ((clockin.clockIn && !clockin.clockOut) || (clockin.clockIn && clockin.clockOut)) {  
                    return res.send(clockin);
                }
                else {
                    return res.send('You have clocked in for today');
                }
            }
            return res.send('You have not clocked in for today');
            
        } catch (error) {
            return res.send(error.message)
        }
    },
    getClockInFromToDate: async(req, res) => {
        try {
            
            const {from, to} = req.query;
            const clockin = await ClockInOut.find({ 
                user: req.user.id, 
                createdAt: { $gte: from, $lte: to }
            });

            if (clockin) {
                return res.send(clockin);
            }

            return res.send('No clock in record found');

        } catch (error) {
            return res.send(error.message)
        }
    },
    setStatus: async(req, res) => {
        try {
            const {status, message} = req.body;
            if (!status) {
                return res.status(400).send('Status is required');
            }
            const user = req.user.id;
            const company = req.user.company;
            
            // if status is of same day update, else create new status
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const statusToday = await Status.findOne({
                user,
                company,
                createdAt: { $gte: today }
            });
            if (statusToday) {
                statusToday.status = status;
                statusToday.message = message;
                await statusToday.save();
                return res.send('Status updated successfully');
            }

            const newStatus = new Status({
                user,
                company,
                status,
                message,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await newStatus.save();
            res.send('Status updated successfully');
        } catch (error) {
            return res.status(500).send(error.message || 'Error updating status');
        }

    },
    getStatus: async(req, res) => {
        try {
            const user = req.user.id;
            const company = req.user.company;

            // get status of the day

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const status = await Status.findOne({
                user,
                company,
                createdAt: { $gte: today }
            });

            if (status) {
                return res.send(status);
            }

            return res.send('No status found');
        } catch (error) {
            return res.status(500).send(error.message || 'Error fetching status');
        }
    },
    getAllStatusMessages: async(req, res) => {
        try {
            const user = req.user.id;
            const company = req.user.company;

            const status = await Status.find({
                user,
                company
            });

            const messages = status.map((stat) => stat.message);
            if (messages.length > 0) {
                return res.send(messages);
            }

            return res.send([]);
        } catch (error) {
            return res.status(500).send(error.message || 'Error fetching status');
        }
    },
    applyLeave: async(req, res) => {

        try {

            const {from, to, reason, type} = req.body;
            if (!from || !to || !reason) {
                return res.status(400).send('All fields are required');
            }
            const user = req.user.id;
            const company = req.user.company;
            const newLeave = new Leave({
                user,
                company,
                leaveType: type,
                startDate: from,
                endDate: to,
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date()
            });


            await newLeave.save();
            res.send('Leave applied successfully');
            
        } catch (error) {
            return res.status(500).send(error.message || 'Error applying for leave');
        }

    },
    submitReview: async(req, res) => {
        try {
            const {title, rating, review} = req.body;
            if (!title || !rating || !review) {
                return res.status(400).send('All fields are required');
            }
            const user = req.user.id;
            const company = req.user.company;
            const newReview = new Review({
                user,
                company,
                title,
                rating,
                review,
                status: 'inactive',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            await newReview.save();
            res.send('Review submitted successfully');
        } catch (error) {
            return res.status(500).send(error.message || 'Error submitting review');
        }
    },

}