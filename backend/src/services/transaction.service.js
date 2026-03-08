const Transaction = require('../models/Transaction');

/**
 * Create a transaction record
 * @param {Object} data - Transaction data
 * @param {Object} session - Mongoose session for atomicity
 */
exports.createTransaction = async (data, session = null) => {
    const transactionData = {
        ...data,
        status: 'completed' // Usually records are made after success
    };

    if (session) {
        return await Transaction.create([transactionData], { session });
    }

    return await Transaction.create(transactionData);
};

/**
 * Record a buy transaction (Buyer side)
 */
exports.recordBuyDebit = async (buyerId, walletId, amount, tradeId, session) => {
    return await this.createTransaction({
        user: buyerId,
        wallet: walletId,
        amount,
        type: 'debit',
        description: `Purchase of gift card (Trade: ${tradeId})`,
        reference: tradeId,
        referenceModel: 'Trade'
    }, session);
};

/**
 * Record a sell transaction (Seller side)
 */
exports.recordSellCredit = async (sellerId, walletId, amount, tradeId, session) => {
    return await this.createTransaction({
        user: sellerId,
        wallet: walletId,
        amount,
        type: 'credit',
        description: `Sale of gift card (Trade: ${tradeId})`,
        reference: tradeId,
        referenceModel: 'Trade'
    }, session);
};

/**
 * Get user transactions
 */
exports.getUserTransactions = async (userId) => {
    return await Transaction.find({ user: userId }).sort('-createdAt');
};

/**
 * Get all transactions (Admin)
 */
exports.getAllTransactions = async () => {
    return await Transaction.find().populate('user', 'name email').sort('-createdAt');
};
