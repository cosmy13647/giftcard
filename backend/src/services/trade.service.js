const Wallet = require('../models/Wallet');
const Trade = require('../models/Trade');
const transactionService = require('./transaction.service');

/**
 * Buy a gift card using atomic transaction
 * @param {string} buyerId - User ID of the buyer
 * @param {string} cardId - ID of the gift card to purchase
 */
exports.buyGiftCard = async (buyerId, cardId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // ... existing code ...
        const giftCard = await GiftCard.findById(cardId).session(session);
        if (!giftCard) throw new Error('Gift card not found');
        if (giftCard.status !== 'available') throw new Error(`Gift card is not available (Status: ${giftCard.status})`);
        if (giftCard.owner.toString() === buyerId) throw new Error('You cannot buy your own gift card');

        const buyerWallet = await Wallet.findOne({ user: buyerId }).session(session);
        if (!buyerWallet) throw new Error('Buyer wallet not found');
        if (buyerWallet.balance < giftCard.value) throw new Error('Insufficient wallet balance');

        const sellerWallet = await Wallet.findOne({ user: giftCard.owner }).session(session);
        if (!sellerWallet) throw new Error('Seller wallet not found');

        // 3. Deduct buyer balance
        buyerWallet.balance -= giftCard.value;
        await buyerWallet.save({ session });

        // 4. Update seller balance
        sellerWallet.balance += giftCard.value;
        await sellerWallet.save({ session });

        // 5. Mark gift card as sold
        giftCard.status = 'sold';
        await giftCard.save({ session });

        // 6. Create trade record
        const trade = await Trade.create([{
            buyer: buyerId,
            seller: giftCard.owner,
            giftCard: giftCard._id,
            amount: giftCard.value,
            status: 'completed',
            completedAt: Date.now()
        }], { session });

        const tradeId = trade[0]._id;

        // 7. Record transactions (Audit Log)
        await transactionService.recordBuyDebit(
            buyerId,
            buyerWallet._id,
            giftCard.value,
            tradeId,
            session
        );

        await transactionService.recordSellCredit(
            giftCard.owner,
            sellerWallet._id,
            giftCard.value,
            tradeId,
            session
        );

        // 8. Commit transaction
        await session.commitTransaction();
        session.endSession();

        return trade[0];
    } catch (error) {
        // 8. Rollback if any step fails
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};
