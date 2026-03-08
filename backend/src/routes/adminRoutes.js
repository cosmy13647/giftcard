const express = require('express');
const {
    getPendingGiftCards,
    approveGiftCard,
    rejectGiftCard
} = require('../controllers/giftcardController');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes require admin authorization
router.use(protect);
router.use(authorize('admin'));

router.get('/pending-giftcards', getPendingGiftCards);
router.patch('/approve-giftcard/:id', approveGiftCard);
router.patch('/reject-giftcard/:id', rejectGiftCard);

module.exports = router;
