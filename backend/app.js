const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./src/middleware/error.middleware');
const AppError = require('./src/errors/AppError');

// Load env vars
dotenv.config();

const app = express();

// Enable CORS first — must be before everything so error responses also get CORS headers
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors()); // pre-flight for all routes

// Set security HTTP headers
app.use(helmet());

// Body parser — 20mb to handle base64 gift card images (front + back)
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

// Basic health check route
app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Import routes
const authRoutes = require('./src/routes/authRoutes');
const giftcardRoutes = require('./src/routes/giftcardRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const walletRoutes = require('./src/routes/wallet.routes');
const tradeRoutes = require('./src/routes/trade.routes');
const transactionRoutes = require('./src/routes/transaction.routes');

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/giftcards', giftcardRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/trade', tradeRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/wallet', walletRoutes);
// Handle undefined routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
