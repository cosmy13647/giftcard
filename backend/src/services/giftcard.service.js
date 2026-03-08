const GiftCard = require('../models/GiftCard');

/**
 * Create a new gift card
 * @param {string} userId - ID of the owner
 * @param {Object} data - Gift card data
 */
exports.createGiftCard = async (userId, data) => {
    return await GiftCard.create({
        ...data,
        owner: userId,
        status: 'pending'
    });
};

/**
 * Get all gift cards for a user
 * @param {string} userId
 */
exports.getUserGiftCards = async (userId) => {
    return await GiftCard.find({ owner: userId }).sort('-createdAt');
};

/**
 * Get all pending gift cards for admin verification
 */
exports.getPendingCards = async () => {
    return await GiftCard.find({ status: 'pending' }).populate('owner', 'name email').sort('-createdAt');
};

/**
 * Get a single gift card by ID
 * @param {string} cardId
 */
exports.getGiftCardById = async (cardId) => {
    return await GiftCard.findById(cardId);
};

/**
 * Verify a gift card (Admin only)
 * @param {string} cardId
 * @param {string} status - 'available' or 'rejected'
 */
exports.verifyGiftCard = async (cardId, status) => {
    return await GiftCard.findByIdAndUpdate(
        cardId,
        {
            status,
            verifiedAt: Date.now()
        },
        { new: true, runValidators: true }
    );
};
/**
 * Get all available gift cards for marketplace
 */
exports.getMarketplaceCards = async () => {
    return await GiftCard.find({ status: 'available' }).populate('owner', 'name').sort('-verifiedAt');
};
