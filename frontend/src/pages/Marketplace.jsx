import React, { useEffect, useState } from 'react';
import { getMarketplaceCards } from '../services/marketplaceService';

// --- Brand Definitions ---
const BRANDS = [
    {
        id: 'amazon',
        name: 'Amazon',
        tagline: 'Shop anything, anytime',
        amounts: [10, 25, 50, 100, 200],
        discount: 30,
        sold: '200+',
        bg: 'from-orange-500 to-amber-400',
        accent: '#FF9900',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-white rounded-xl px-3 py-1.5 inline-block shadow">
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '22px', color: '#221F1F' }}>amazon</span>
                <div style={{ height: '4px', background: '#FF9900', borderRadius: '4px', marginTop: '1px' }}></div>
            </div>
        ),
    },
    {
        id: 'apple',
        name: 'Apple',
        tagline: 'App Store & iTunes',
        amounts: [10, 25, 50, 100, 200],
        discount: 20,
        sold: '320+',
        bg: 'from-gray-900 to-gray-700',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-white rounded-xl px-3 py-2 inline-block shadow">
                <svg viewBox="0 0 814 1000" className="h-7 w-auto" style={{ fill: '#1d1d1f' }}>
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.9 0 663.3 0 541.8 0 377.3 102.1 281 201.6 281H217c66.1 0 132.6 44.2 177.5 44.2 43.4 0 123.3-50.7 200.9-50.7 31.3 0 133.4 3.2 202.9 109.5zm-107.4-181.6C645.6 104.3 701.6 52 731.9 52c4.5 0 9 0 13.5 1.3-3.2 70.3-62.2 128.6-103.7 153.5-37.8 22.8-106.4 50.7-165.3 50.7 0-6.4-1.3-12.8-1.3-19.9 0-72.8 52.2-155.5 108.8-195.4" />
                </svg>
            </div>
        ),
    },
    {
        id: 'google',
        name: 'Google Play',
        tagline: 'Apps, games, movies & more',
        amounts: [10, 25, 50, 100],
        discount: 15,
        sold: '450+',
        bg: 'from-blue-600 to-green-400',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-white rounded-xl px-3 py-2 inline-flex items-center gap-2 shadow">
                <svg viewBox="0 0 512 512" className="h-6 w-6">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zm-65.4 65.5l-25.2 25.2L13 325.3l282.4 52-35.5-77.5zm65.5 65.5l-60.2 60.2-161.2-280.8 221.4 220.6zm62.6-153L325.3 234.3l-66.7 66.7 65.5 65.5 63.9-34.7z" fill="#00d8ff" />
                    <path d="M0 512l325.3-325.3L512 512H0z" fill="none" />
                </svg>
                <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '14px', color: '#3c4043' }}>Google Play</span>
            </div>
        ),
    },
    {
        id: 'steam',
        name: 'Steam',
        tagline: 'PC gaming universe',
        amounts: [5, 10, 20, 50, 100],
        discount: 25,
        sold: '180+',
        bg: 'from-slate-700 to-blue-900',
        accent: '#66c0f4',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-[#1b2838] rounded-xl px-3 py-2 inline-block shadow">
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '18px', color: '#66c0f4', letterSpacing: '2px' }}>STEAM</span>
            </div>
        ),
    },
    {
        id: 'walmart',
        name: 'Walmart',
        tagline: 'Save money. Live better.',
        amounts: [10, 25, 50, 100, 200],
        discount: 20,
        sold: '300+',
        bg: 'from-blue-600 to-blue-400',
        accent: '#FFC220',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-white rounded-xl px-3 py-2 inline-block shadow">
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '20px', color: '#0071CE' }}>Walmart</span>
                <span style={{ color: '#FFC220', fontSize: '16px' }}> ✦</span>
            </div>
        ),
    },
    {
        id: 'playstation',
        name: 'PlayStation',
        tagline: 'Play has no limits',
        amounts: [10, 20, 50, 100],
        discount: 20,
        sold: '250+',
        bg: 'from-blue-800 to-blue-600',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-white rounded-xl px-3 py-2 inline-flex items-center gap-2 shadow">
                <svg viewBox="0 0 100 100" className="h-6 w-6" fill="#003087">
                    <path d="M65 20 C65 20 50 18 40 30 L40 75 L55 80 L55 35 C55 30 58 27 62 28 C66 29 67 33 67 38 L67 75 L82 68 L82 38 C82 28 75 20 65 20Z" />
                    <path d="M0 68 L0 75 L35 85 L35 78 Z" />
                    <path d="M38 73 C38 73 15 66 15 60 C15 55 22 53 38 58 L38 50 C20 45 0 48 0 60 C0 72 38 82 38 82Z" />
                </svg>
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '14px', color: '#003087' }}>PlayStation</span>
            </div>
        ),
    },
    {
        id: 'xbox',
        name: 'Xbox',
        tagline: 'Built for the next generation',
        amounts: [10, 15, 25, 50, 100],
        discount: 15,
        sold: '190+',
        bg: 'from-green-700 to-green-500',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-white rounded-xl px-3 py-2 inline-flex items-center gap-2 shadow">
                <svg viewBox="0 0 100 100" className="h-6 w-6" fill="#107C10">
                    <circle cx="50" cy="50" r="45" />
                    <path fill="white" d="M28 30 C40 18 70 42 70 42 C70 42 45 20 28 30ZM72 30 C60 18 30 42 30 42 C30 42 55 20 72 30ZM50 55 C50 55 25 70 28 75 C35 80 50 62 50 62 C50 62 65 80 72 75 C75 70 50 55 50 55Z" />
                </svg>
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '20px', color: '#107C10' }}>xbox</span>
            </div>
        ),
    },
    {
        id: 'netflix',
        name: 'Netflix',
        tagline: 'Watch everywhere',
        amounts: [15, 25, 50, 100],
        discount: 25,
        sold: '500+',
        bg: 'from-red-700 to-red-600',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-black rounded-xl px-3 py-2 inline-block shadow">
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '20px', color: '#E50914', letterSpacing: '1px' }}>NETFLIX</span>
            </div>
        ),
    },
    {
        id: 'spotify',
        name: 'Spotify',
        tagline: 'Music for everyone',
        amounts: [10, 20, 30, 60],
        discount: 20,
        sold: '380+',
        bg: 'from-green-500 to-green-400',
        accent: '#1DB954',
        textOnCard: 'text-black',
        logo: (
            <div className="bg-black rounded-xl px-3 py-2 inline-flex items-center gap-2 shadow">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#1DB954">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.371-.721.49-1.101.241-3.021-1.858-6.832-2.278-11.322-1.247-.43.1-.862-.16-.962-.59-.1-.431.159-.862.59-.962 4.911-1.121 9.122-.641 12.483 1.441.371.24.49.72.24 1.101l.072.016zm1.471-3.271c-.301.462-.932.601-1.392.301-3.462-2.131-8.732-2.75-12.823-1.501-.531.16-1.082-.141-1.232-.671-.161-.531.141-1.082.671-1.232 4.671-1.421 10.473-.731 14.443 1.712.461.291.601.932.301 1.392l.032-.001zm.127-3.401C15.53 8.371 8.68 8.131 5.12 9.251c-.641.201-1.321-.16-1.521-.801-.201-.64.159-1.321.8-1.521 4.122-1.261 10.972-1.021 15.302 1.741.571.341.761 1.081.421 1.661-.341.571-1.081.761-1.661.421l.187-.003z" />
                </svg>
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '16px', color: '#1DB954' }}>Spotify</span>
            </div>
        ),
    },
    {
        id: 'ebay',
        name: 'eBay',
        tagline: 'Buy & sell worldwide',
        amounts: [10, 25, 50, 100, 200],
        discount: 15,
        sold: '160+',
        bg: 'from-blue-600 via-red-500 to-yellow-400',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-white rounded-xl px-3 py-2 inline-block shadow">
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '22px' }}>
                    <span style={{ color: '#e53238' }}>e</span>
                    <span style={{ color: '#0064d2' }}>b</span>
                    <span style={{ color: '#f5af02' }}>a</span>
                    <span style={{ color: '#86b817' }}>y</span>
                </span>
            </div>
        ),
    },
    {
        id: 'target',
        name: 'Target',
        tagline: 'Expect more. Pay less.',
        amounts: [10, 25, 50, 100],
        discount: 20,
        sold: '280+',
        bg: 'from-red-600 to-red-500',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-white rounded-xl px-3 py-2 inline-flex items-center gap-2 shadow">
                <svg viewBox="0 0 100 100" className="h-6 w-6">
                    <circle cx="50" cy="50" r="45" fill="#CC0000" />
                    <circle cx="50" cy="50" r="30" fill="white" />
                    <circle cx="50" cy="50" r="15" fill="#CC0000" />
                </svg>
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '20px', color: '#CC0000' }}>Target</span>
            </div>
        ),
    },
    {
        id: 'nike',
        name: 'Nike',
        tagline: 'Just Do It',
        amounts: [25, 50, 75, 100, 150],
        discount: 25,
        sold: '210+',
        bg: 'from-gray-900 to-black',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-white rounded-xl px-4 py-2 inline-block shadow">
                <svg viewBox="0 0 512 182" className="h-7 w-auto" fill="#1a1a1a">
                    <path d="M510.4 18.1L142 161.6c-32.7 12.2-60.5 17-76.7 17C27.2 178.6.6 152 .6 118.6c0-51.5 48.2-71.1 85.3-85l344-126.7 80.5 111.2z" />
                </svg>
            </div>
        ),
    },
    {
        id: 'bestbuy',
        name: 'Best Buy',
        tagline: 'Expert service. Unbeatable price.',
        amounts: [15, 25, 50, 100, 200],
        discount: 20,
        sold: '170+',
        bg: 'from-blue-700 to-yellow-400',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-yellow-400 rounded-xl px-3 py-2 inline-flex items-center gap-1 shadow">
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '16px', color: '#003087' }}>BEST</span>
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '16px', color: '#003087' }}>BUY</span>
            </div>
        ),
    },
    {
        id: 'roblox',
        name: 'Roblox',
        tagline: 'Robux & game passes',
        amounts: [10, 20, 50, 100],
        discount: 15,
        sold: '600+',
        bg: 'from-red-500 to-red-400',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-[#e31c1c] rounded-xl px-3 py-2 inline-block shadow">
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '20px', color: 'white', letterSpacing: '1px' }}>ROBLOX</span>
            </div>
        ),
    },
    {
        id: 'lululemon',
        name: 'lululemon',
        tagline: 'Athletic & lifestyle apparel',
        amounts: [25, 50, 100, 200],
        discount: 20,
        sold: '140+',
        bg: 'from-slate-800 to-slate-600',
        accent: '#ffffff',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-white rounded-xl px-3 py-2 inline-block shadow">
                <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1d1d1f', letterSpacing: '1px' }}>lululemon</span>
            </div>
        ),
    },
    {
        id: 'ikea',
        name: 'IKEA',
        tagline: 'The wonderful everyday',
        amounts: [10, 25, 50, 100, 200],
        discount: 15,
        sold: '130+',
        bg: 'from-blue-700 to-blue-500',
        accent: '#FFDA1A',
        textOnCard: 'text-white',
        logo: (
            <div className="bg-yellow-400 rounded-xl px-4 py-2 inline-block shadow">
                <span style={{ fontFamily: 'Arial Black, sans-serif', fontWeight: 900, fontSize: '24px', color: '#003399', letterSpacing: '3px' }}>IKEA</span>
            </div>
        ),
    },
];

const GiftCard = ({ brand }) => {
    const [selected, setSelected] = useState(brand.amounts[Math.floor(brand.amounts.length / 2)]);

    const discountedPrice = (selected * (1 - brand.discount / 100)).toFixed(2);
    const savings = (selected - discountedPrice).toFixed(2);

    return (
        <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border border-slate-100">
            {/* Card Header with brand color */}
            <div className={`bg-gradient-to-br ${brand.bg} p-5 relative`}>
                {/* Badges */}
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wide shadow">
                        {brand.discount}% OFF
                    </span>
                    <span className="bg-black/20 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        {brand.sold} sold
                    </span>
                </div>

                {/* Logo */}
                <div className="mb-3">{brand.logo}</div>

                {/* Selected value */}
                <div className="mt-3">
                    <p className={`${brand.textOnCard} opacity-70 text-xs font-semibold uppercase tracking-wider`}>Gift Card Value</p>
                    <p className={`text-4xl font-black ${brand.textOnCard}`}>${selected}</p>
                    <p className={`${brand.textOnCard} opacity-60 text-xs mt-0.5`}>{brand.tagline}</p>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-4">
                {/* Amount pills */}
                <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-2">Select Amount</p>
                    <div className="flex flex-wrap gap-2">
                        {brand.amounts.map(amt => (
                            <button
                                key={amt}
                                onClick={() => setSelected(amt)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${selected === amt
                                        ? 'bg-primary text-white shadow scale-105'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                ${amt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pricing */}
                <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                        <span>Value:</span>
                        <span className="line-through">${selected}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Save ({brand.discount}%):</span>
                        <span>-${savings}</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-black text-base pt-1 border-t border-slate-200">
                        <span>You Pay:</span>
                        <span className="text-primary">${discountedPrice}</span>
                    </div>
                </div>

                {/* Buy Button */}
                <button
                    onClick={() => alert(`${brand.name} $${selected} gift card — purchase flow coming soon!`)}
                    className="w-full py-3 rounded-xl bg-primary text-white font-bold text-sm hover:bg-primary-dark hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-primary/20"
                >
                    Buy ${selected} for ${discountedPrice}
                </button>
            </div>
        </div>
    );
};

const Marketplace = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const filtered = BRANDS.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const fetchMarketplace = async () => {
            try {
                const response = await getMarketplaceCards();
                if (!response.error) setCards(response.data);
            } catch (e) { /* silent */ }
            setLoading(false);
        };
        fetchMarketplace();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-primary mb-1">Buy Gift Cards</h1>
                <p className="text-gray-500 mb-6">Verified gift cards at discounted prices. Instant delivery.</p>

                {/* Search */}
                <div className="relative max-w-md">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search brands..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Brands', value: BRANDS.length + '+' },
                    { label: 'Avg Discount', value: '21%' },
                    { label: 'Total Sold', value: '3,800+' },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-center">
                        <p className="text-2xl font-black text-primary">{s.value}</p>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Featured Cards Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {filtered.map(brand => (
                        <GiftCard key={brand.id} brand={brand} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200 mb-12">
                    <p className="text-lg text-gray-400">No brands match your search.</p>
                </div>
            )}

            {/* User-listed cards from backend */}
            {(loading || cards.length > 0) && (
                <>
                    <h2 className="text-xl font-bold text-slate-700 mb-4">Community Listed Cards</h2>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {cards.map(card => (
                                <div key={card._id} className="card flex flex-col justify-between hover:shadow-md transition-shadow">
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-lg font-bold text-darkGray">{card.brand}</h3>
                                            <span className="text-xs px-2 py-1 rounded-full font-semibold bg-green-100 text-green-700">
                                                {card.status?.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-3xl font-black text-primary mb-4">${card.value?.toFixed(2)}</p>
                                        <div className="text-sm text-gray-600 mb-4 flex justify-between">
                                            <span>Seller:</span>
                                            <span className="truncate ml-2">{card.owner?.name || 'Unknown'}</span>
                                        </div>
                                    </div>
                                    <button className="btn-primary py-2 text-sm w-full">Buy Now</button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Marketplace;
