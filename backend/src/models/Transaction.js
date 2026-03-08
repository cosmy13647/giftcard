const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    wallet: {
        type: mongoose.Schema.ObjectId,
        ref: 'Wallet',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add transaction amount']
    },
    type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    description: {
        type: String,
        required: true
    },
    reference: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'referenceModel'
    },
    referenceModel: {
        type: String,
        required: true,
        enum: ['Trade', 'Wallet', 'GiftCard']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
