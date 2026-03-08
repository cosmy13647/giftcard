const Wallet = require('../models/Wallet');

/**
 * Get wallet by user ID (Creates one if it doesn't exist)
 * @param {string} userId
 */
exports.getWalletByUserId = async (userId) => {
    let wallet = await Wallet.findOne({ user: userId });

    // Auto-create wallet if it doesn't exist for the user
    if (!wallet) {
        wallet = await Wallet.create({ user: userId });
    }

    return wallet;
};

/**
 * Update wallet balance safely
 * @param {string} userId
 * @param {number} amount (can be positive or negative)
 */
exports.updateBalance = async (userId, amount) => {
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) throw new Error('Wallet not found');

    if (amount < 0 && wallet.balance + amount < 0) {
        throw new Error('Insufficient balance');
    }

    wallet.balance += amount;
    return await wallet.save();
};

/**
 * Lock funds for a trade
 * @param {string} userId
 * @param {number} amount
 */
exports.lockFunds = async (userId, amount) => {
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) throw new Error('Wallet not found');

    if (wallet.balance < amount) {
        throw new Error('Insufficient balance to lock funds');
    }

    wallet.balance -= amount;
    wallet.lockedBalance += amount;
    return await wallet.save();
};

/**
 * Unlock/Release funds
 * @param {string} userId
 * @param {number} amount
 */
exports.unlockFunds = async (userId, amount) => {
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) throw new Error('Wallet not found');

    if (wallet.lockedBalance < amount) {
        throw new Error('Insufficient locked funds to unlock');
    }

    wallet.lockedBalance -= amount;
    wallet.balance += amount;
    return await wallet.save();
};
