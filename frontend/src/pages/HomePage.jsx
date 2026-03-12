import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const token = localStorage.getItem('token');

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col justify-center items-center">
            {/* Background animated blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-light rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-slate-200/60 backdrop-blur-md shadow-sm mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-primary relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    </span>
                    <span className="text-sm font-medium text-slate-600">The premier platform for gift cards</span>
                </div>

                {/* Hero Title */}
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                    Unlock the Value of <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                        Every Gift Card
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Buy and sell gift cards instantly with absolute security. Join Gift Card Hub and start trading with confidence today.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {token ? (
                        <Link
                            to="/admin/verify"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                        >
                            Verify
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/login"
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-slate-700 font-semibold shadow-sm border border-slate-200 hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300 hover:shadow-md"
                            >
                                Log In
                            </Link>
                        </>
                    )}
                </div>

                {/* Trust indicators */}
                <div className="mt-16 pt-8 border-t border-slate-200/60 grid grid-cols-2 lg:grid-cols-4 gap-8 text-slate-500 text-sm font-medium">
                    <div className="flex flex-col items-center gap-2">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Secure Escrow
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Instant Trades
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Verified Users
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Best Rates
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
