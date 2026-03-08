/**
 * Validate gift card buy data
 */
exports.validateBuy = (req, res, next) => {
    const { cardId } = req.params;

    if (!cardId) {
        return res.status(400).json({
            success: false,
            message: 'Gift card ID is required'
        });
    }

    next();
};
