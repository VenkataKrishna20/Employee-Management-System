import express from 'express';
import {login , verify}  from '../controllers/loginController.js'
import authMiddleware from "../middleware/authMiddleware.js"

const routers = express.Router();

routers.post('/login', login)
routers.get('/verify', authMiddleware, verify)

export default routers;