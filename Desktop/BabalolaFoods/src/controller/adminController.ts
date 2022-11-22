import {Request,Response} from 'express'
import { adminSchema, GenerateOTP, GeneratePassword, GenerateSalt, GenerateSignature, option, vendorSchema} from '../utils';
import { UserAttributes, UserInstance } from '../model/userModel';
import {v4 as uuidv4}from 'uuid'
import { JwtPayload } from 'jsonwebtoken';
import { VendorAttributes, VendorInstance } from '../model/vendorModel';


/*=======Admin Register=========*/

export const  AdminRegister = async(req:JwtPayload,res:Response)=>{
    try{
        const id = req.user.id
        const {email, phone, password, confirm_password, firstName, lastName, address} = req.body;
        const uuiduser = uuidv4()
    
        const validateResult = adminSchema.validate(req.body,option)
        if(validateResult.error){
          return res.status(400).json({
            Error:validateResult.error.details[0].message
          })
        }
    
        //Generate Salt
        const salt = await GenerateSalt()
        const adminPassword = await GeneratePassword(password,salt)
     
    
      //Generate OTP
      const {otp,expiry} = GenerateOTP()
    
      //check if admin exist
      const Admin = await UserInstance.findOne({where:{id:id}}) as unknown as UserAttributes
      
        if(Admin.email === email){
            return res.status(400).json({
                message:'Email already exists'
              }) 
        }

        if(Admin.phone === phone){
            return res.status(400).json({
                message:'Phone number already exists'
              }) 
        }

      //Create Admin
      if(Admin.role === "superadmin"){
       await UserInstance.create({
          id:uuiduser,
          email,
          password:adminPassword,
          firstName,
          lastName,
          salt,
          address,
          phone,
          otp,
          otp_expiry:expiry,
          lng:0,
          lat:0,
          verified:true,
          role:"admin"
        })
    
        
        //check if admin exists(where you give the admin identity)
        const Admin = await UserInstance.findOne({where:{id:id}}) as unknown as UserAttributes
          
        //Generate Signature for user
       let signature= await GenerateSignature({
          id:Admin.id,
          email:Admin.email,
          verified:Admin.verified
    
        })
    
         return res.status(201).json({
          message:'Admin created successfully', 
          signature,
          verified:Admin.verified,
    
    
        })
      }
      return res.status(400).json({
        message:'Admin already exists'
      }) 
        
     }catch(err){
      res.status(500).json({
        Error:"Internal server Error",
        route:"/admins/create-admin"
      })
     }
}

/** =============== Super Admin =============== **/
export const  superAdmin = async(req:Request,res:Response)=>{
    try{
       
        const {email, phone, password, confirm_password, firstName, lastName, address} = req.body;
        const uuiduser = uuidv4()
    
        const validateResult = adminSchema.validate(req.body,option)
        if(validateResult.error){
          return res.status(400).json({
            Error:validateResult.error.details[0].message
          })
        }
    
        //Generate Salt
        const salt = await GenerateSalt()
        const adminPassword = await GeneratePassword(password,salt)
     
    
      //Generate OTP
      const {otp,expiry} = GenerateOTP()
    
      //check if admin exist
      const Admin = await UserInstance.findOne({where:{email:email}}) as unknown as UserAttributes
   

      //Create Admin
      if(!Admin){
       await UserInstance.create({
          id:uuiduser,
          email,
          password:adminPassword,
          firstName,
          lastName,
          salt,
          address,
          phone,
          otp,
          otp_expiry:expiry,
          lng:0,
          lat:0,
          verified:true,
          role:"superadmin"
        })
    
        
        //check if admin exists(where you give the admin identity)
        const Admin = await UserInstance.findOne({where:{email:email}}) as unknown as UserAttributes
          
        //Generate Signature for user
       let signature= await GenerateSignature({
          id:Admin.id,
          email:Admin.email,
          verified:Admin.verified
    
        })
    
         return res.status(201).json({
          message:'Admin created successfully', 
          signature,
          verified:Admin.verified,
    
    
        })
      }
      return res.status(400).json({
        message:'Admin already exists'
      }) 
        
     }catch(err){
      res.status(500).json({
        Error:"Internal server Error",
        route:"/admins/create-super-admin"
      })
     }
}

 
/** ============== Create Vendor ============== **/
export const createVendor = async(req:JwtPayload,res:Response)=>{
  try{
    const id = req.user.id
    const { name,ownerName,pincode,phone,address,email, password,} = req.body
    const uuidvendor = uuidv4()

    const validateResult = vendorSchema.validate(req.body,option)
    if(validateResult.error){
      return res.status(400).json({
        Error:validateResult.error.details[0].message
      })
    }
    //Generate Salt
    const salt = await GenerateSalt()
    const vendorPassword = await GeneratePassword(password,salt)

    //check if admin exist
    const Vendor = await VendorInstance.findOne({where:{email:email}}) as unknown as VendorAttributes
    
    const Admin = await UserInstance.findOne({where:{id:id}}) as unknown as UserAttributes
     
    if(Admin.role === 'admin'|| Admin.role ==='superadmin')  {
        //Create Admin
    if(!Vendor){
      const createVendor= await VendorInstance.create({
         id:uuidvendor,
         name,
         email,
         password:vendorPassword,
         ownerName,
         salt,
         address,
         phone,
         pincode,
         rating:0,
         serviceAvailable:false,
         role:"vendor"
       })
        return res.status(201).json({
         message:'Vendor created successfully', 
         createVendor
       })
     }
     return res.status(400).json({
      message:'Vendor already exists'
    }) 
      }  

    return res.status(400).json({
      message:'Unauthorized'
    }) 

  }catch(err){
    res.status(500).json({
      Error:"Internal server Error",
      route:"/admins/create-vendors"
    })
  }
}