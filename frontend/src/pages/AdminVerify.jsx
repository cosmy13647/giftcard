import React, { useEffect, useState } from 'react';
import { getPendingGiftCards, verifyGiftCard, rejectGiftCard } from '../services/giftcardService';

// Modal for full card preview
const CardPreviewModal = ({ card, onClose, onVerify, onReject, actionLoading }) => {
    if (!card) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div
                className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-slate-100">
                    <div>
                        <h2 className="text-xl font-black text-slate-900">Review Gift Card</h2>
                        <p className="text-sm text-slate-400">Check all details before making a decision</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                        <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Card info grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Brand', value: card.brand },
                            { label: 'Face Value', value: `$${card.value?.toFixed(2)}` },
                            { label: 'Serial / Code', value: card.serialNumber || card.code || '—', mono: true },
                            { label: 'Seller', value: card.owner?.email || card.owner?.name || 'Unknown' },
                            { label: 'Submitted', value: card.createdAt ? new Date(card.createdAt).toLocaleString() : 'N/A' },
                            { label: 'Status', value: card.status || 'pending' },
                        ].map(({ label, value, mono }) => (
                            <div key={label} className="bg-slate-50 rounded-xl p-3">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                                <p className={`text-sm font-bold text-slate-900 truncate ${mono ? 'font-mono' : ''}`}>{value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Card Images */}
                    <div>
                        <p className="text-sm font-bold text-slate-700 mb-3">Card Images</p>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Front */}
                            <div className="space-y-2">
                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Front</p>
                                {card.frontImage ? (
                                    <a href={card.frontImage} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={card.frontImage}
                                            alt="Front of card"
                                            className="w-full h-44 object-cover rounded-xl border border-slate-200 hover:opacity-90 transition-opacity cursor-zoom-in"
                                        />
                                    </a>
                                ) : (
                                    <div className="w-full h-44 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                                        <p className="text-xs text-slate-400">No front image</p>
                                    </div>
                                )}
                            </div>

                            {/* Back */}
                            <div className="space-y-2">
                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Back</p>
                                {card.backImage ? (
                                    <a href={card.backImage} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={card.backImage}
                                            alt="Back of card"
                                            className="w-full h-44 object-cover rounded-xl border border-slate-200 hover:opacity-90 transition-opacity cursor-zoom-in"
                                        />
                                    </a>
                                ) : (
                                    <div className="w-full h-44 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center">
                                        <p className="text-xs text-slate-400">No back image</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 text-center">Click an image to open full size</p>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                        <button
                            onClick={() => onReject(card._id)}
                            disabled={actionLoading}
                            className="py-3 rounded-xl bg-white border-2 border-red-200 text-red-600 font-bold text-sm hover:bg-red-50 hover:border-red-400 transition-all disabled:opacity-50"
                        >
                            {actionLoading === 'reject' ? 'Rejecting...' : '✕ Reject'}
                        </button>
                        <button
                            onClick={() => onVerify(card._id)}
                            disabled={actionLoading}
                            className="py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-all shadow-md shadow-primary/20 disabled:opacity-50"
                        >
                            {actionLoading === 'verify' ? 'Verifying...' : '✓ Verify & Approve'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminVerify = ({ isEmbedded = false }) => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const [actionLoading, setActionLoading] = useState(null); // 'verify' | 'reject' | null

    const fetchPendingCards = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await getPendingGiftCards();
            setCards(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch pending gift cards');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPendingCards(); }, []);

    const handleVerify = async (cardId) => {
        setActionLoading('verify');
        try {
            await verifyGiftCard(cardId);
            setSelectedCard(null);
            await fetchPendingCards();
        } catch (err) {
            alert('Verification failed. Please try again.');
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (cardId) => {
        setActionLoading('reject');
        try {
            await rejectGiftCard(cardId);
            setSelectedCard(null);
            await fetchPendingCards();
        } catch (err) {
            alert('Rejection failed. Please try again.');
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) return (
        <div className={`flex justify-center flex-col items-center ${isEmbedded ? 'h-48' : 'h-screen bg-slate-50'} gap-4`}>
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            <p className="text-slate-500 font-medium">Loading pending cards...</p>
        </div>
    );

    return (
        <>
            {/* Card Preview Modal */}
            <CardPreviewModal
                card={selectedCard}
                onClose={() => setSelectedCard(null)}
                onVerify={handleVerify}
                onReject={handleReject}
                actionLoading={actionLoading}
            />

            <div className={isEmbedded ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'}>
                {!isEmbedded && (
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Verification</h1>
                        <p className="text-slate-500 mt-2">Review and verify gift card submissions before they appear in the marketplace.</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-100 flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                    </div>
                )}

                {cards.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center gap-3">
                        <svg className="w-14 h-14 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-semibold text-slate-500">Queue is empty</p>
                        <p className="text-slate-400 text-sm">All pending gift cards have been processed.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Brand</th>
                                        <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Seller</th>
                                        <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {cards.map((card) => (
                                        <tr key={card._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                                                        {card.brand?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-sm">{card.brand}</p>
                                                        <p className="text-xs text-slate-400">{card.type?.toUpperCase()}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="font-bold text-slate-900">${card.value?.toFixed(2)}</p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm text-slate-700 max-w-[160px] truncate">
                                                    {card.owner?.email || card.owner?.name || 'Unknown'}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <p className="text-sm text-slate-500">
                                                    {card.createdAt ? new Date(card.createdAt).toLocaleDateString() : 'N/A'}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                                                    {card.status || 'pending'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* View button — opens modal */}
                                                    <button
                                                        onClick={() => setSelectedCard(card)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => handleVerify(card._id)}
                                                        className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-colors"
                                                    >
                                                        ✓ Verify
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(card._id)}
                                                        className="px-3 py-1.5 bg-white border border-red-200 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 transition-colors"
                                                    >
                                                        ✕ Reject
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminVerify;
