const express = require('express');
const { getMyTransactions, getAllTransactions } = require('../controllers/transaction.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/', getMyTransactions);
router.get('/all', authorize('admin'), getAllTransactions);

module.exports = router;
