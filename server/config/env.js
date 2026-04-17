import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000
export const MONGO_URL = process.env.MONGODB_URL
export const JWT_KEY = process.env.JWT_KEY