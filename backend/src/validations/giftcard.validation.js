/**
 * Validate gift card upload data
 * @param {Object} data
 * @returns {Array} - Array of error messages
 */
exports.validateGiftCardUpload = (req, res, next) => {
    const { title, brand, type, value, initialBalance, currentBalance, serialNumber, pin, code } = req.body;
    const errors = [];

    if (!title) errors.push('Title is required');
    if (!brand) errors.push('Brand is required');
    if (!type || !['static', 'dynamic'].includes(type)) errors.push('Valid type is required (static or dynamic)');
    if (value === undefined || value < 0) errors.push('Valid value is required');
    if (initialBalance === undefined || initialBalance < 0) errors.push('Initial balance is required');
    if (currentBalance === undefined || currentBalance < 0) errors.push('Current balance is required');
    if (!serialNumber) errors.push('Serial number is required');
    if (!pin) errors.push('PIN is required');
    if (!code) errors.push('Code is required');

    if (errors.length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    next();
};
