import express from 'express';
import dotenv from "dotenv"
import cors from 'cors';
import departmentRouter from './routes/department.js'
import authRouter from './routes/authRouter.js'
import connectToDatabase from './db/db.js';

//Load environment variables FIRST
dotenv.config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Roues
app.use('/api/auth',authRouter);
app.use('/api/department',departmentRouter)

//Start Server
const startServer = async ()=>{
    try{
        console.log("Starting server...")

        await connectToDatabase();
        console.log("DB done, starting listen...");

        const PORT = process.env.PORT || 5000;

        console.log("PORT VALUE:", PORT, typeof PORT);

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server listening on the port ${PORT}`);
        });

    }catch(error){
        console.error("Server failed to start:", error.message);
        process.exit(1);
    }
};

startServer();