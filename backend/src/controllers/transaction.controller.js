const catchAsync = require('../utils/catchAsync');
const transactionService = require('../services/transaction.service');

/**
 * @desc    Get current user transactions
 * @route   GET /api/v1/transactions
 * @access  Private
 */
exports.getMyTransactions = catchAsync(async (req, res, next) => {
    const transactions = await transactionService.getUserTransactions(req.user.id);

    res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions
    });
});

/**
 * @desc    Get all transactions (Admin only)
 * @route   GET /api/v1/transactions/all
 * @access  Private/Admin
 */
exports.getAllTransactions = catchAsync(async (req, res, next) => {
    const transactions = await transactionService.getAllTransactions();

    res.status(200).json({
        success: true,
        count: transactions.length,
        data: transactions
    });
});
