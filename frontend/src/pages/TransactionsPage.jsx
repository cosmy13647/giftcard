import React from 'react';
import TransactionList from '../components/TransactionList';

const TransactionsPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-primary">Transaction History</h1>
                <p className="text-gray-600">A detailed log of all your purchases, sales, and balance updates.</p>
            </div>
            <div className="card shadow-md">
                <TransactionList />
            </div>
        </div>
    );
};

export default TransactionsPage;
