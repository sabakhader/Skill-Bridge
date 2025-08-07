const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://tasneemaldwaikat:KY04ciPJhZ0qTAKE@cluster0.fpbaziq.mongodb.net/SkillBridgeDatabase?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);

        // Drop the username index if it exists
        const collections = await conn.connection.db.collections();
        const userCollection = collections.find(c => c.collectionName === 'users');
        
        if (userCollection) {
            try {
                await userCollection.dropIndex('username_1');
                console.log('Username index dropped successfully');
            } catch (error) {
                // Index might not exist, ignore error
                console.log('No username index found to drop');
            }
        }

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;