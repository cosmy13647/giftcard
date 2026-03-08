import React, { useEffect, useState } from 'react';
import { getMe } from '../services/authService';
import AdminVerify from './AdminVerify';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getMe();
            if (!response.error) setUser(response.data);
            setLoading(false);
        };
        fetchUserData();
    }, []);

    if (loading && !user) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-primary mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Overview */}
                <div className="lg:col-span-1">
                    <div className="card shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-darkGray">{user?.name}</h2>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Role:</span>
                                <span className="font-medium capitalize">{user?.role || 'User'}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Account Status:</span>
                                <span className="text-primary font-bold">Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Panel */}
                <div className="lg:col-span-2">
                    <div className="card shadow-md">
                        {user?.role === 'admin' ? (
                            <>
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-primary">Pending Verifications</h3>
                                    <p className="text-sm text-gray-500">Review gift cards waiting for marketplace approval.</p>
                                </div>
                                <AdminVerify isEmbedded={true} />
                            </>
                        ) : (
                            <TransactionList />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
