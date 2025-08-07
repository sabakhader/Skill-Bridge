import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://tasneemaldwaikat@gmail.com:20000012300003@atlas-sql-683787eaf4a31a5dfb2fce0f-qfee7y.a.query.mongodb.net/SkillBridgeDatabase?ssl=true&authSource=admin&retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB; 