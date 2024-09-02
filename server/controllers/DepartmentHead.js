const Leave = require('../models/Leave');
const User = require('../models/User');
const Department = require('../models/Department');
const Company = require('../models/Company');
const ClockInOut = require('../models/ClockInOut');
const Notification = require('../models/Notification');

module.exports = {

    getLeaves: async function (req, res) {
            try {
                const {status} = req.query;
                const department_id = req.department;
                const findCondition = {
                    department: department_id
                };
                if(status) findCondition.status = status;
                const leaves = await Leave.find(findCondition).populate('user', 'name email').populate('department', 'name').populate('company', 'name');
                return res.status(200).json(leaves);
    
            } catch (error) {
                return res.status(500).json({ message: error.message });
            }
    },
    changeLeaveStatus: async function (req, res) {
        try {
            const { status } = req.body;
            const leaveId = req.params.id;
            const leave = await Leave.findById(leaveId);
            if (!leave) return res.status(404).json({ message: 'Leave not found.' });
            leave.status = status;
            await leave.save();

            // raise notification to user
            const notification = new Notification({
                user: leave.user,
                message: `Your leave request has been ${status} from ${leave.startDate} to ${leave.endDate}.`,
                company: leave.company,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await notification.save();

            // reduce the leave balance from the user account

            if(status === 'approved') {
                const user = await User.findById(leave.user);
                user.balanceOfAnnualLeaves -= leave.days;
                await user.save();
            }

            return res.status(200).json(leave);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    schedule: async function (req, res) {
        try {

            const {from, to} = req.query;
            if(!from || !to) return res.status(400).json({message: 'Please provide from and to date.'});

            const clockInOut = await ClockInOut.find({
                clockIn: {$gte: from, $lte: to},
                assigned: true
            }).populate('user', 'name email').populate('company', 'name');

            return res.status(200).json(clockInOut);
            
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    addSchedule: async function (req, res) {
        try {
            const { user, company, clockIn, clockOut, date } = req.body;
    
            // Convert clockIn and clockOut to Date objects
            const clockInUTC = new Date(clockIn);
            const clockOutUTC = new Date(clockOut);
    
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(startDate.getDate() + 1); // End of the day
    
            // Check if the user is already scheduled for the date
            const existingSchedule = await ClockInOut.findOne({
                user,
                clockIn: { $gte: startDate, $lt: endDate },
                assigned: true
            });
    
            if (existingSchedule) {
                existingSchedule.clockIn = clockInUTC;
                existingSchedule.clockOut = clockOutUTC;
                await existingSchedule.save();
                return res.status(200).json(existingSchedule);
            }
    
            const newSchedule = new ClockInOut({
                user,
                company,
                clockIn: clockInUTC,
                clockOut: clockOutUTC,
                assigned: true
            });
            await newSchedule.save();

            const notification = new Notification({
                user,
                message: `You have been scheduled to work on ${date} from ${clockIn} to ${clockOut}.`,
                company,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await notification.save();

            return res.status(201).json(newSchedule);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
        
}