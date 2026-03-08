import React, { useEffect, useState, useRef } from 'react';
import { uploadGiftCard, getMyGiftCards } from '../services/giftcardService';

const COUNTRIES = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Switzerland',
    'Japan', 'South Korea', 'Singapore', 'New Zealand', 'Ireland',
    'Belgium', 'Austria', 'Italy', 'Spain', 'Portugal', 'Poland',
    'Czech Republic', 'Hungary', 'Romania', 'Greece', 'Finland',
    'Mexico', 'Brazil', 'India', 'UAE', 'Saudi Arabia', 'South Africa',
    'Nigeria', 'Ghana', 'Kenya', 'Other'
];

const BRANDS = [
    'Amazon', 'Apple', 'Google Play', 'Steam', 'Walmart',
    'PlayStation', 'Xbox', 'Netflix', 'Spotify', 'eBay',
    'Target', 'Nike', 'Best Buy', 'Roblox', 'lululemon', 'IKEA', 'Other'
];

const statusConfig = {
    pending: {
        label: 'Awaiting Verification',
        color: 'bg-amber-100 text-amber-800 border border-amber-200',
        dot: 'bg-amber-400',
    },
    available: {
        label: 'Live on Marketplace',
        color: 'bg-green-100 text-green-800 border border-green-200',
        dot: 'bg-green-400',
    },
    rejected: {
        label: 'Rejected',
        color: 'bg-red-100 text-red-800 border border-red-200',
        dot: 'bg-red-400',
    },
    sold: {
        label: 'Sold',
        color: 'bg-blue-100 text-blue-800 border border-blue-200',
        dot: 'bg-blue-400',
    }
};

const ImageUploadBox = ({ label, id, preview, onFileChange }) => (
    <div className="flex flex-col gap-2">
        <label className="block text-sm font-bold text-slate-700">{label}</label>

        {/* Preview area */}
        <div className="relative h-40 border-2 border-dashed border-primary/30 rounded-2xl bg-primary/5 overflow-hidden flex items-center justify-center">
            {preview ? (
                <img src={preview} alt={label} className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
            ) : (
                <div className="flex flex-col items-center gap-1">
                    <svg className="w-8 h-8 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-slate-400">No image selected</p>
                </div>
            )}
        </div>

        {/* Two buttons: Camera + Gallery/File */}
        <div className="grid grid-cols-2 gap-2">
            {/* Take Photo — uses device camera on mobile */}
            <label
                htmlFor={`${id}-camera`}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-white text-xs font-bold cursor-pointer hover:bg-primary-dark transition-colors shadow-sm"
                title="Take a photo with your camera"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Take Photo
            </label>
            {/* capture="environment" = rear camera on phones */}
            <input
                id={`${id}-camera`}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={onFileChange}
                className="hidden"
            />

            {/* Choose from Gallery / File Explorer */}
            <label
                htmlFor={`${id}-gallery`}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-200 transition-colors border border-slate-200"
                title="Choose from gallery or file system"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload File
            </label>
            {/* No capture attribute = gallery on phones, file picker on desktop */}
            <input
                id={`${id}-gallery`}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
            />
        </div>
    </div>
);

const MyCards = () => {
    const [cards, setCards] = useState([]);
    const [cardsLoading, setCardsLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [frontPreview, setFrontPreview] = useState(null);
    const [backPreview, setBackPreview] = useState(null);
    const [frontFile, setFrontFile] = useState(null);
    const [backFile, setBackFile] = useState(null);
    const formRef = useRef(null);

    const [form, setForm] = useState({
        country: '',
        brand: '',
        customBrand: '',
        code: '',
        serialNumber: '',
        pin: '',
        value: '',
        email: '',
    });

    const fetchCards = async () => {
        setCardsLoading(true);
        const res = await getMyGiftCards();
        if (!res.error) setCards(res.data || []);
        setCardsLoading(false);
    };

    useEffect(() => { fetchCards(); }, []);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (side) => (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            if (side === 'front') { setFrontPreview(reader.result); setFrontFile(file); }
            else { setBackPreview(reader.result); setBackFile(file); }
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!frontPreview || !backPreview) {
            setMessage({ type: 'error', text: 'Please upload both front and back images of your gift card.' });
            return;
        }

        setSubmitLoading(true);
        setMessage({ type: '', text: '' });

        const brand = form.brand === 'Other' ? form.customBrand : form.brand;

        const payload = {
            title: `${brand} Gift Card`,
            brand,
            type: 'static',
            value: parseFloat(form.value),
            initialBalance: parseFloat(form.value),
            currentBalance: parseFloat(form.value),
            serialNumber: form.serialNumber || form.code,
            pin: form.pin || 'N/A',
            code: form.code,
            frontImage: frontPreview,
            backImage: backPreview,
            country: form.country,
            email: form.email,
        };

        const response = await uploadGiftCard(payload);

        if (response.error) {
            setMessage({ type: 'error', text: response.message });
        } else {
            setMessage({ type: 'success', text: '✅ Your gift card has been submitted! Our team will verify it within 1 hour.' });
            setForm({ country: '', brand: '', customBrand: '', code: '', serialNumber: '', pin: '', value: '', email: '' });
            setFrontPreview(null);
            setBackPreview(null);
            setFrontFile(null);
            setBackFile(null);
            fetchCards();
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        setSubmitLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-primary">Verify a Gift Card</h1>
                <p className="text-slate-500 mt-1">Submit your gift card for review. After verification it will be listed on the marketplace.</p>
            </div>



            {/* Submission Form */}
            <div ref={formRef} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 mb-10">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-black">1</span>
                    Card Details
                </h2>

                {message.text && (
                    <div className={`p-4 rounded-xl border-l-4 mb-6 ${message.type === 'success' ? 'bg-green-50 border-green-400 text-green-800' : 'bg-red-50 border-red-400 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row: Country + Brand */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Country <span className="text-red-500">*</span></label>
                            <select
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            >
                                <option value="">Select your country</option>
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Gift Card Brand <span className="text-red-500">*</span></label>
                            <select
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            >
                                <option value="">Select brand</option>
                                {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                    </div>

                    {form.brand === 'Other' && (
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Specify Brand <span className="text-red-500">*</span></label>
                            <input
                                name="customBrand"
                                value={form.customBrand}
                                onChange={handleChange}
                                required
                                placeholder="Enter brand name"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                        </div>
                    )}

                    {/* Row: Code + Expected Amount */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Gift Card Code <span className="text-red-500">*</span></label>
                            <input
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                                required
                                placeholder="e.g. XXXX-XXXX-XXXX-XXXX"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Expected Amount (USD) <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">$</span>
                                <input
                                    type="number"
                                    name="value"
                                    value={form.value}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                        <p className="text-xs text-slate-400 mt-1">We'll send your verification update to this email.</p>
                    </div>

                    {/* Image Upload Section */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">2</span>
                            Upload Card Images
                        </h3>

                        {/* Image quality warning */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 flex items-start gap-3">
                            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-xs text-blue-800">
                                <p className="font-bold mb-1">📸 Image Requirements</p>
                                <ul className="list-disc list-inside space-y-0.5 text-blue-700">
                                    <li>Ensure both images are <strong>clear and well-lit</strong></li>
                                    <li>The card must <strong>not be scratched</strong> or damaged</li>
                                    <li>All numbers and text must be <strong>fully visible</strong></li>
                                    <li>No glare, shadows, or blurring on critical details</li>
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <ImageUploadBox
                                label="Front of Card *"
                                id="front-image"
                                preview={frontPreview}
                                onFileChange={handleImageChange('front')}
                            />
                            <ImageUploadBox
                                label="Back of Card *"
                                id="back-image"
                                preview={backPreview}
                                onFileChange={handleImageChange('back')}
                            />
                        </div>
                        {frontPreview && backPreview && (
                            <div className="mt-3 flex gap-3">
                                <button type="button" onClick={() => { setFrontPreview(null); setFrontFile(null); }}
                                    className="text-xs text-red-500 hover:underline">Remove front</button>
                                <button type="button" onClick={() => { setBackPreview(null); setBackFile(null); }}
                                    className="text-xs text-red-500 hover:underline">Remove back</button>
                            </div>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={submitLoading}
                            className="w-full py-4 rounded-2xl bg-primary text-white font-black text-base hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {submitLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Submitting for Review...
                                </span>
                            ) : 'Submit Card for Verification'}
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-3">
                            By submitting, you confirm this card is genuine and has the stated balance. Fraudulent submissions will result in account suspension.
                        </p>
                    </div>
                </form>
            </div>

            {/* ⏱ Processing Time Notice — bottom */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <p className="text-amber-800 font-bold text-sm">⏱ Your card is being reviewed — this may take up to 1 hour</p>
                    <p className="text-amber-700 text-xs mt-0.5">All submitted gift cards are securely stored in our database and manually reviewed by our verification team. You will be notified by email once approved.</p>
                </div>
            </div>

            {/* Submitted Cards Tracking */}
            <div>
                <h2 className="text-xl font-bold text-slate-800 mb-4">My Submitted Cards</h2>

                {cardsLoading ? (
                    <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : cards.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400">No cards submitted yet. Fill out the form above to get started!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {cards.map(card => {
                            const status = statusConfig[card.status] || statusConfig.pending;
                            return (
                                <div key={card._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-black flex-shrink-0">
                                            {card.brand?.charAt(0) || '?'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{card.brand} — ${card.value?.toFixed(2)}</p>
                                            <p className="text-xs text-slate-400 font-mono">{card.serialNumber}</p>
                                            <p className="text-xs text-slate-400">{card.createdAt ? new Date(card.createdAt).toLocaleDateString() : ''}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${status.color}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                        {status.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCards;
