const catchAsync = require('../utils/catchAsync');
const tradeService = require('../services/trade.service');

/**
 * @desc    Buy a gift card
 * @route   POST /api/v1/trades/buy/:cardId
 * @access  Private
 */
exports.buyGiftCard = catchAsync(async (req, res, next) => {
    const trade = await tradeService.buyGiftCard(req.user.id, req.params.cardId);

    res.status(201).json({
        success: true,
        data: trade
    });
});
