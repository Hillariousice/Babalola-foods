import express from 'express';
import { createFood, deleteFood, VendorLogin, VendorProfile } from '../controller/vendorController';
import {  authVendor } from '../middleware/authorization';

const router = express.Router();

router.post('/login',VendorLogin)
router.post('/create-food',authVendor,createFood)
router.get('/get-profile',authVendor,VendorProfile)
router.delete('/delete-food/:foodid',authVendor,deleteFood)





export default router;