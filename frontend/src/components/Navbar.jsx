import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const handleLogout = () => {
        logout();
        localStorage.removeItem('user');
        setIsMobileMenuOpen(false);
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const linkClasses = (path) => `
        px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${isActive(path)
            ? 'text-primary bg-primary/10'
            : 'text-darkGray hover:text-primary hover:bg-slate-50'}
    `;

    const mobileLinkClasses = (path) => `
        block px-4 py-3 text-base font-medium rounded-md transition-colors
        ${isActive(path)
            ? 'text-primary bg-primary/10'
            : 'text-slate-700 hover:text-primary hover:bg-slate-50'}
    `;

    // Verify: admins see the admin queue, regular users see their own card statuses
    const verifyPath = user?.role === 'admin' ? '/admin/verify' : '/my-cards';

    return (
        <nav className="bg-white border-b border-lightGray sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                        <span className="text-primary text-2xl font-bold tracking-tight">GiftCard Hub</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        {token ? (
                            <>
                                {/* Desktop Menu */}
                                <div className="hidden md:flex items-center space-x-1">
                                    <Link to="/" className={linkClasses('/')}>Home</Link>
                                    <Link to="/marketplace" className={linkClasses('/marketplace')}>Buy</Link>
                                    <Link to="/upload-giftcard" className={linkClasses('/upload-giftcard')}>Sell</Link>
                                    <Link to={verifyPath} className={linkClasses(verifyPath)}>Verify</Link>
                                </div>
                                <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>

                                <button
                                    onClick={handleLogout}
                                    className="hidden md:block btn-secondary py-1.5 px-4 text-sm"
                                >
                                    Logout
                                </button>

                                {/* Mobile Toggle */}
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="md:hidden p-2 rounded-md text-slate-500 hover:text-primary hover:bg-slate-100 focus:outline-none transition-colors"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {isMobileMenuOpen ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-darkGray hover:text-primary text-sm font-medium">Login</Link>
                                <Link to="/register" className="btn-primary py-2 px-6 text-sm">Get Started</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {token && isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg py-2 px-4 flex flex-col gap-1 z-40">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses('/')}>Home</Link>
                    <Link to="/marketplace" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses('/marketplace')}>Buy</Link>
                    <Link to="/upload-giftcard" onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses('/upload-giftcard')}>Sell</Link>
                    <Link to={verifyPath} onClick={() => setIsMobileMenuOpen(false)} className={mobileLinkClasses(verifyPath)}>Verify</Link>

                    <div className="h-px bg-slate-200 my-2"></div>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
