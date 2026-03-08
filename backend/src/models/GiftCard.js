const mongoose = require('mongoose');

const giftCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand']
    },
    type: {
        type: String,
        enum: ['static', 'dynamic'],
        required: [true, 'Please add a gift card type']
    },
    value: {
        type: Number,
        required: [true, 'Please add the card value']
    },
    initialBalance: {
        type: Number,
        required: [true, 'Please add the initial balance']
    },
    currentBalance: {
        type: Number,
        required: [true, 'Please add the current balance']
    },
    serialNumber: {
        type: String,
        required: [true, 'Please add serial number'],
        unique: true
    },
    pin: {
        type: String,
        required: [true, 'Please add PIN']
    },
    code: {
        type: String,
        required: [true, 'Please add code']
    },
    frontImage: {
        type: String,
        required: [true, 'Please add front image of the card']
    },
    backImage: {
        type: String,
        required: [true, 'Please add back image of the card']
    },
    status: {
        type: String,
        enum: ['pending', 'available', 'sold', 'redeemed', 'rejected'],
        default: 'pending'
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    verifiedAt: {
        type: Date
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('GiftCard', giftCardSchema);
