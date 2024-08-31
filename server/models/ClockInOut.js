const mongoose = require('mongoose');

const clockInOutSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide a user for this clock in/out.'],
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: [true, 'Please provide a company for this clock in/out.'],
        },
        clockIn: {
            type: Date,
            required: [true, 'Please provide a clock in time.'],
        },
        clockOut: {
            type: Date
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    });

const ClockInOut = mongoose.model('ClockInOut', clockInOutSchema);

module.exports = ClockInOut;