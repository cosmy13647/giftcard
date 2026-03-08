const express = require('express');
const {
    uploadGiftCard,
    getMyGiftCards,
    verifyGiftCard,
    getMarketplaceListing,
    getPendingGiftCards,
    approveGiftCard,
    rejectGiftCard
} = require('../controllers/giftcardController');
const { validateGiftCardUpload } = require('../validations/giftcard.validation');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth.middleware');

// Public routes
router.get('/marketplace', getMarketplaceListing);
router.get('/', getMarketplaceListing);

// Protected routes
router.use(protect);

router.post('/upload', validateGiftCardUpload, uploadGiftCard);
router.get('/my-cards', getMyGiftCards);

// Admin routes
router.use(authorize('admin'));
router.get('/pending', getPendingGiftCards);
router.patch('/:id/approve', approveGiftCard);
router.patch('/:id/reject', rejectGiftCard);
router.put('/:id/verify', verifyGiftCard);

module.exports = router;
