import express from 'express'
import { isAuthenticated, login, logout, register, resetPassword, sendResetOTP, sendVerifyOTP, verifyEmail, verifyResetOTP } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/sendverifyotp', userAuth, sendVerifyOTP)
authRouter.post('/verifyotp', userAuth, verifyEmail)
authRouter.get('/isauth', userAuth, isAuthenticated)
authRouter.post('/sendresetotp', sendResetOTP)
authRouter.post('/verifyresetotp', userAuth, verifyResetOTP)
authRouter.post('/resetpassword', userAuth, resetPassword)


export default authRouter