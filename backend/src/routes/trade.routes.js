const express = require('express');
const { buyGiftCard } = require('../controllers/trade.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateBuy } = require('../validations/trade.validation');

const router = express.Router();

router.post('/buy/:cardId', protect, validateBuy, buyGiftCard);

module.exports = router;
