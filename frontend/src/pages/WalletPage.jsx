import React from 'react';
import Wallet from '../components/Wallet';

const WalletPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-primary">Financial Overview</h1>
                <p className="text-gray-600">Securely manage your wallet, balances, and assets.</p>
            </div>
            <div className="max-w-3xl">
                <Wallet showDetails={true} />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card bg-surface/50 border-dashed border-2">
                    <h3 className="font-bold mb-2">Deposit Funds</h3>
                    <p className="text-sm text-gray-500 mb-4">Add money to your wallet to purchase gift cards instantly.</p>
                    <button className="btn-secondary text-sm w-full opacity-50 cursor-not-allowed">Coming Soon</button>
                </div>
                <div className="card bg-surface/50 border-dashed border-2">
                    <h3 className="font-bold mb-2">Withdraw</h3>
                    <p className="text-sm text-gray-500 mb-4">Transfer your available balance to your bank account or crypto wallet.</p>
                    <button className="btn-secondary text-sm w-full opacity-50 cursor-not-allowed">Coming Soon</button>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
