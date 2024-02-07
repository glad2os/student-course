import mongoose from 'mongoose';

const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoDatabase = process.env.MONGO_DATABASE || 'your_database_name';
const mongoURL = `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`;

console.log(`${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`);
// Connect to MongoDB
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

export default mongoose;
