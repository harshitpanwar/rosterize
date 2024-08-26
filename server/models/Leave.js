const monogoose = require('mongoose');

const leaveSchema = new monogoose.Schema({
    user: {
        type: monogoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user for this leave.'],
    },
    leaveType: {
        type: String,
        enum: ['medical', 'annual'],
        required: [true, 'Please provide a leave type for this leave.'],
    },
    startDate: {
        type: Date,
        required: [true, 'Please provide a start date for this leave.'],
    },
    endDate: {
        type: Date,
        required: [true, 'Please provide an end date for this leave.'],
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        required: [true, 'Please provide a status for this leave.'],
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

export const Leave = monogoose.model('Leave', leaveSchema);