import express from 'express';
import {  AdminRegister, createVendor, superAdmin } from '../controller/adminController';
import { auth } from '../middleware/authorization';

const router = express.Router();


router.post('/create-admin',auth, AdminRegister);

router.post('/create-super-admin',auth,superAdmin);
router.post('/create-vendors',auth,createVendor);



export default router;