import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { getWallet } from '../services/walletService';

/**
 * Reusable Wallet component to display user balances.
 * Exposes a 'refresh' method to parent components via ref.
 */
const Wallet = forwardRef((props, ref) => {
    const [balances, setBalances] = useState({
        available: 0,
        pending: 0,
        locked: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWalletData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getWallet();
            if (response.error) {
                setError(response.message);
            } else {
                setBalances({
                    available: response.data.balance || 0,
                    pending: response.data.pendingBalance || 0,
                    locked: response.data.lockedBalance || 0
                });
            }
        } catch (err) {
            setError('Failed to connect to the wallet service');
        } finally {
            setLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        refresh: fetchWalletData
    }));

    useEffect(() => {
        fetchWalletData();
    }, []);

    if (error) {
        return (
            <div className="card bg-red-50 border-red-200">
                <p className="text-red-600 mb-3">{error}</p>
                <button onClick={fetchWalletData} className="btn-secondary py-1 text-sm">Retry</button>
            </div>
        );
    }

    return (
        <div className="card shadow-lg bg-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>

            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    My Assets
                </h3>
                {loading && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Available</p>
                    <p className="text-3xl font-black text-primary">${balances.available.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Pending</p>
                    <p className="text-xl font-bold text-darkGray">${balances.pending.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Locked</p>
                    <p className="text-xl font-bold text-gray-400">${balances.locked.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
});

export default Wallet;
