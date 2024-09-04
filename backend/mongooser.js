import mongoose from 'mongoose';

export const connectDB = async () => {
    let mongoURL = 'mongodb+srv://trinadhhash5:trinadh%40hash5@cluster0.5nuwult.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    try {
      await mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected');
    } catch (error) {
      console.error('Connection error', error);
      process.exit(1);
    }
  };

export const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log('MongoDB disconnected');
}


