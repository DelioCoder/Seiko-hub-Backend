import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGODB_URL: process.env.MONGO_URL,
    SECRET_KEY: process.env.SECRET_KEY,
}