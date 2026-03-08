const walletService = require('../services/wallet.service');

// @desc    Get current user wallet
// @route   GET /api/v1/wallet
// @access  Private
exports.getWallet = async (req, res, next) => {
    try {
        const wallet = await walletService.getWalletByUserId(req.user.id);

        if (!wallet) {
            return res.status(404).json({ success: false, error: 'Wallet not found' });
        }

        res.status(200).json({
            success: true,
            data: wallet
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update balance (Internal/Testing)
// @route   POST /api/v1/wallet/update
// @access  Private
exports.updateBalance = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const wallet = await walletService.updateBalance(req.user.id, amount);

        res.status(200).json({
            success: true,
            data: wallet
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
