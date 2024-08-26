const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user for this status.'],
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'Please provide a company for this status.'],
    },
    status: {
        type: String,
        required: [true, 'Please provide a status.'],
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

export const Status = mongoose.model('Status', statusSchema);