const giftcardService = require('../services/giftcard.service');

// @desc    Upload a new gift card
// @route   POST /api/v1/giftcards/upload
// @access  Private
exports.uploadGiftCard = async (req, res, next) => {
    try {
        console.log(`\n--- NEW UPLOAD INIT ---`);
        console.log(`[INFO] Received gift card upload request from user ID: ${req.user.id}`);
        console.log(`[INFO] Payload contents: Brand=${req.body.brand}, Value=$${req.body.value}, InitialBalance=$${req.body.initialBalance}`);

        const giftCard = await giftcardService.createGiftCard(req.user.id, req.body);

        console.log(`[SUCCESS] Gift card securely saved! Mongo ID: ${giftCard._id}`);
        console.log(`[SUCCESS] Current status marked as: "${giftCard.status}". Ready for Admin Verification.`);
        console.log(`-----------------------\n`);

        res.status(201).json({
            success: true,
            data: giftCard
        });
    } catch (err) {
        console.error("\n[ERROR] UPLOAD ERROR DETAILS:", err);
        console.error("-----------------------\n");
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get user's uploaded gift cards
// @route   GET /api/v1/giftcards/my-cards
// @access  Private
exports.getMyGiftCards = async (req, res, next) => {
    try {
        const giftCards = await giftcardService.getUserGiftCards(req.user.id);

        res.status(200).json({
            success: true,
            count: giftCards.length,
            data: giftCards
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Verify gift card (Approve/Reject)
// @route   PUT /api/v1/giftcards/:id/verify
// @access  Private/Admin
exports.verifyGiftCard = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!['available', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Please provide a valid status (available or rejected)' });
        }

        const giftCard = await giftcardService.verifyGiftCard(req.params.id, status);

        if (!giftCard) {
            return res.status(404).json({ success: false, error: 'Gift card not found' });
        }

        res.status(200).json({
            success: true,
            data: giftCard
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get pending gift cards for verification
// @route   GET /api/v1/giftcards/pending
// @access  Private/Admin
exports.getPendingGiftCards = async (req, res, next) => {
    try {
        console.log(`\n--- FETCHING PENDING CARDS ---`);
        console.log(`[INFO] Admin User ID (${req.user.id}) is accessing the verification queue...`);

        const giftCards = await giftcardService.getPendingCards();

        console.log(`[SUCCESS] Found ${giftCards.length} pending gift cards in the database.`);
        console.log(`------------------------------\n`);

        res.status(200).json({
            success: true,
            count: giftCards.length,
            data: giftCards
        });
    } catch (err) {
        console.error("\n[ERROR] GET PENDING ERROR DETAILS:", err);
        console.error("------------------------------\n");
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Approve a gift card
// @route   PATCH /api/v1/giftcards/:id/approve
// @access  Private/Admin
exports.approveGiftCard = async (req, res, next) => {
    try {
        const giftCard = await giftcardService.verifyGiftCard(req.params.id, 'available');

        if (!giftCard) {
            return res.status(404).json({ success: false, error: 'Gift card not found' });
        }

        res.status(200).json({
            success: true,
            data: giftCard
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Reject a gift card
// @route   PATCH /api/v1/giftcards/:id/reject
// @access  Private/Admin
exports.rejectGiftCard = async (req, res, next) => {
    try {
        const giftCard = await giftcardService.verifyGiftCard(req.params.id, 'rejected');

        if (!giftCard) {
            return res.status(404).json({ success: false, error: 'Gift card not found' });
        }

        res.status(200).json({
            success: true,
            data: giftCard
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get marketplace gift cards
// @route   GET /api/v1/giftcards/marketplace
// @access  Public
exports.getMarketplaceListing = async (req, res, next) => {
    try {
        const giftCards = await giftcardService.getMarketplaceCards();

        res.status(200).json({
            success: true,
            count: giftCards.length,
            data: giftCards
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
