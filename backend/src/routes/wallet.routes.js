const express = require('express');
const { getWallet, updateBalance } = require('../controllers/wallet.controller');

const router = express.Router();

const { protect } = require('../middleware/auth.middleware');

router.use(protect);

router.get('/', getWallet);
router.post('/update', updateBalance);

module.exports = router;
