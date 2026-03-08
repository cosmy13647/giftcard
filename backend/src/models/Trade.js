const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    giftCard: {
        type: mongoose.Schema.ObjectId,
        ref: 'GiftCard',
        required: true
    },
    amount: {
        type: Number,
        required: [true, 'Please add a trade amount']
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'completed', 'cancelled'],
        default: 'open'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Trade', tradeSchema);
