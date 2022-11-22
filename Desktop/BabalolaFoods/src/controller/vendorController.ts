import {Request,Response} from 'express'
import { option,GenerateSignature,  loginSchema, validatePassword, } from '../utils';
import {v4 as uuidv4}from 'uuid'
import { JwtPayload } from 'jsonwebtoken';
import { VendorAttributes, VendorInstance } from '../model/vendorModel';
import { FoodAttributes, FoodInstance } from '../model/foodModel';


/** ============== Vendor Login============== **/
export const VendorLogin = async(req:Request,res:Response)=>{
try{
    const { email, password } = req.body;
  
    const validateResult = loginSchema.validate(req.body,option)
    if(validateResult.error){
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }

    //check if the vendor exist
    const Vendor = await VendorInstance.findOne({where:{email:email}}) as unknown as VendorAttributes
    if(Vendor){
     const validation = await validatePassword(password,Vendor.password,Vendor.salt)
     if(validation) {

      //Generate signature for user
      let signature= await GenerateSignature({
        id:Vendor.id,
        email:Vendor.email,
        serviceAvailable:Vendor.serviceAvailable
  
      })
     return res.status(200).json({
      message:"You have successfully login",  
       signature,
        email:Vendor.email,
        serviceAvailable:Vendor.serviceAvailable,
        role:Vendor.role
      })
    }
    }

    return res.status(400).json({
      Error:'Wrong Username or Password or not a verified user'
    })
}catch(err){
    res.status(500).json({
        Error:"Internal server Error",
        route:"/vendors/login"
      });
}
}

/** ============== Vendor Create Food============== **/
export const createFood = async(req:JwtPayload,res:Response)=>{
try{
    const id = req.vendor.id
    const foodid = uuidv4()
    const { name,description,category, foodType,readyTime, price}= req.body
    const Vendor = await VendorInstance.findOne({where:{id:id}}) as unknown as VendorAttributes

    if(Vendor){
        const createfood= await FoodInstance.create({
            id:foodid,
            name,
            description,
            category,
            foodType,
            readyTime,
            price,
            rating:0,
            vendorId:id
          })
           return res.status(201).json({
            message:'Food added successfully', 
            createfood
          })
    }

}catch(err){
    res.status(500).json({
        Error:"Internal server Error",
        route:"/vendors/create-food"
      });
}
}


/** ============== Get Vendor profile ============== **/
export const VendorProfile = async(req:JwtPayload,res:Response)=>{
  try{
    const id = req.vendor.id
    const Vendor = await VendorInstance.findOne({where:{id:id},
      attributes:["id","name","ownerName","address","phone","pincode","email","rating"],
      include:[{model:FoodInstance, as:"food", 
      attributes:["id","name","description","category","foodType","readyTime","price","rating","vendorId"]}]}) as unknown as VendorAttributes

    return res.status(200).json({
      Vendor
  })
  }catch(err){
    res.status(500).json({
      Error:"Internal server Error",
      route:"/vendors/get-profile"
    });
  }
}

/** ==============  Vendor  Delete Food ============== **/
export const deleteFood = async(req:JwtPayload,res:Response)=>{
  try{
    const id = req.vendor.id;
    const foodid = req.params.foodid
    const Vendor = await VendorInstance.findOne({where:{id:id}}) as unknown as VendorAttributes
if(Vendor){
 
   const deletedFood = await FoodInstance.destroy({where:{id:foodid}}) 
   return res.status(201).json({
    message:'Food deleted successfully', 
   deletedFood
  })

}
  }catch(err){
    res.status(500).json({
      Error:"Internal server Error",
      route:"/vendors/delete-food"
    });
  }
}