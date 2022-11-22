import express from 'express';
import { getAllUsers, getSingleUser, Login, Register, resendOTP, updateUserProfile, verifyUser } from '../controller/userController';
import { auth } from '../middleware/authorization';

const router = express.Router();


router.post('/signup', Register);
router.post('/verify/:signature', verifyUser);
router.post('/login', Login)
router.get('/resend-otp/:signature',resendOTP)
router.get('/get-all-users',getAllUsers)
router.get('/get-single-user',auth, getSingleUser)
router.patch('/update-profile',auth,updateUserProfile)



export default router;