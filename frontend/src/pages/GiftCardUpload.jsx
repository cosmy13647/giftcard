import React, { useState } from 'react';
import { uploadGiftCard } from '../services/giftcardService';

const GiftCardUpload = () => {
    const [formData, setFormData] = useState({
        title: '',
        brand: '',
        type: 'static',
        value: '',
        initialBalance: '',
        currentBalance: '',
        serialNumber: '',
        pin: '',
        code: '',
        frontImage: 'https://via.placeholder.com/300x200?text=Front+Image',
        backImage: 'https://via.placeholder.com/300x200?text=Back+Image'
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const payload = {
            ...formData,
            value: parseFloat(formData.value),
            initialBalance: parseFloat(formData.initialBalance),
            currentBalance: parseFloat(formData.currentBalance)
        };

        const response = await uploadGiftCard(payload);

        if (response.error) {
            setMessage({ type: 'error', text: response.message });
        } else {
            setMessage({ type: 'success', text: 'Gift card uploaded successfully! Our team will verify it shortly.' });
            setFormData({
                title: '',
                brand: '',
                type: 'static',
                value: '',
                initialBalance: '',
                currentBalance: '',
                serialNumber: '',
                pin: '',
                code: '',
                frontImage: 'https://via.placeholder.com/300x200?text=Front+Image',
                backImage: 'https://via.placeholder.com/300x200?text=Back+Image'
            });
        }
        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-primary mb-2">Sell Gift Card</h1>
                <p className="text-gray-600">Enter the details of your gift card. All submissions are verified before listing on the marketplace.</p>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl border-l-4 mb-8 ${message.type === 'success'
                    ? 'bg-green-50 border-green-400 text-green-700 font-medium'
                    : 'bg-red-50 border-red-400 text-red-700'
                    }`}>
                    <div className="flex items-center gap-3">
                        {message.type === 'success' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {message.text}
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="card shadow-md space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Listing Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required className="input-field" placeholder="e.g. Amazon $50 Gift Card" />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Brand</label>
                        <input name="brand" value={formData.brand} onChange={handleChange} required className="input-field" placeholder="e.g. Amazon" />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Card Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="input-field">
                            <option value="static">Physical Card (Static)</option>
                            <option value="dynamic">E-Gift Card (Dynamic)</option>
                        </select>
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Face Value ($)</label>
                        <input type="number" name="value" value={formData.value} onChange={handleChange} required className="input-field" placeholder="50.00" />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Initial Balance ($)</label>
                        <input type="number" name="initialBalance" value={formData.initialBalance} onChange={handleChange} required className="input-field" placeholder="50.00" />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Current Balance ($)</label>
                        <input type="number" name="currentBalance" value={formData.currentBalance} onChange={handleChange} required className="input-field" placeholder="50.00" />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Serial Number</label>
                        <input name="serialNumber" value={formData.serialNumber} onChange={handleChange} required className="input-field" placeholder="The number printed on the card back" />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">PIN</label>
                        <input name="pin" value={formData.pin} onChange={handleChange} required className="input-field" placeholder="Secret PIN" />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Secret Code</label>
                        <input name="code" value={formData.code} onChange={handleChange} required className="input-field" placeholder="Redemption Code" />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full py-4 text-lg shadow-lg shadow-primary/10"
                    >
                        {loading ? 'Processing Submission...' : 'Upload Gift Card for Review'}
                    </button>
                    <p className="mt-4 text-center text-xs text-gray-400">By uploading, you confirm that this card is legitimate and has the stated balance.</p>
                </div>
            </form>
        </div>
    );
};

export default GiftCardUpload;
