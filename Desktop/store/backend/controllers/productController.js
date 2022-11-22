const asyncHandler = require('express-async-handler')
const { getOriginalNode } = require('typescript')
const Product = require('../model/productModels')
const User =require('../model/userModels')


//@desc GET all users
//@route GET /api/user
const getProducts = asyncHandler (async(req, res) => {
    const products = await Product.find({user: req.user.id})
    res.status(200).json(products)
})

//@desc Create all products
//@route POST /api/user
const setProducts = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text field')
    };
    const product = await Product.create({
        text:req.body.text,
        user:req.user.id
    })
    res.status(200).json(product)
})

//@desc Update all users
//@route PUT /api/user
const updateProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error('User not found')
    }
   
    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure logged in product matches user of product
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    })
    res.status(200).json(updatedProduct)
})

//@desc Remove products
//@route DELETE /api/user
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404)
        throw new Error('User not found')
    }

    
    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure logged in product matches user of product
    if(product.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await product.remove()
    res.status(200).json({id:req.params.id})
})


module.exports ={
    getProducts,
    setProducts,
    updateProduct,
    deleteProduct
}