const app = require('./app');
const connectDB = require('./src/config/db');
const User = require('./src/models/User');

// Connect to database
connectDB();

// Initialize Default Admin User
const initializeDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ role: 'admin' });
        if (!adminExists) {
            // Password hashing is handled automatically by the pre-save hook in User model
            await User.create({
                name: 'System Admin',
                email: 'admin@gifthub.com',
                password: 'admin123',
                role: 'admin',
                isVerified: true
            });
            console.log('Default admin account created: admin@gifthub.com');
        }
    } catch (error) {
        console.error('Failed to initialize default admin:', error.message);
    }
};

// Run initialization
initializeDefaultAdmin();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
