import React, { useState, useEffect } from 'react';
import { getMyTransactions } from '../services/transactionService';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTransactions = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await getMyTransactions();
            setTransactions(response.data);
        } catch (err) {
            setError('Failed to load transaction history.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-700">Recent Transactions</h3>
                <button
                    onClick={fetchTransactions}
                    disabled={loading}
                    className="text-primary hover:text-primary-dark text-sm font-semibold flex items-center gap-1"
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    )}
                    <span>Refresh</span>
                </button>
            </div>

            {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-100">{error}</p>}

            {!loading && transactions.length === 0 ? (
                <div className="text-center py-10 text-gray-400 italic">
                    No transactions found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 italic">
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="pb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((tx) => (
                                <tr key={tx._id} className="hover:bg-surface/50 transition-colors">
                                    <td className="py-4 text-xs text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                    <td className="py-4">
                                        <p className="text-sm font-medium text-darkGray">{tx.description}</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-black">{tx.type}</p>
                                    </td>
                                    <td className="py-4 font-bold">
                                        <span className={tx.type === 'credit' ? 'text-primary' : 'text-red-500'}>
                                            {tx.type === 'credit' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${tx.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {loading && transactions.length === 0 && (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse flex space-x-4 h-12 bg-gray-50 rounded-md"></div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;
