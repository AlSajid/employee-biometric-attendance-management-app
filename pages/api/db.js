import mongoose from 'mongoose';

const uri = `mongodb+srv://AlSajid:MonirBhai@biometric-attendance.pji39yi.mongodb.net/?retryWrites=true&w=majority`;
// console.log(process.env.USER)
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