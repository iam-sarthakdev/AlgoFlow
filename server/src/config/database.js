import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dsa_revision';

// MongoDB connection with retry logic
const connectDB = async (retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            await mongoose.connect(MONGODB_URI, {
                serverSelectionTimeoutMS: 30000,
                socketTimeoutMS: 45000,
                maxPoolSize: 10,
                retryWrites: true,
            });
            console.log('✅ Connected to MongoDB database');
            return;
        } catch (error) {
            console.error(`❌ MongoDB connection attempt ${attempt}/${retries} failed:`, error.message);
            if (attempt === retries) {
                console.error('❌ All MongoDB connection attempts failed');
                process.exit(1);
            }
            // Wait 5 seconds before retrying
            console.log(`⏳ Retrying in 5 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

// Handle connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
});

export default connectDB;
