import mongoose from 'mongoose';

const uri = `mongodb+srv://AlSajid:J5p6oDQ5rWSOxERD@cluster0.xe6plxx.mongodb.net`;
let isConnected = false;

export const connectDb = async () => {
    if (isConnected) {
        console.log('👍 already connected');
        return;
    }

    try {
        await mongoose.connect(uri, {
            dbName: "biometric-attendance"
        });

        isConnected = true;
        console.log('👍 connected');
    } catch (e) {
        console.log('👎:', e)
    }
}