import axios from "axios";

const API_URL = '/api/products/'

// Create new product
const createProduct = async (productData, token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL,productData,config)
    return response.data
}
// Get user product
const getProducts = async (token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)
    return response.data
}

// Delete product
const deleteProduct = async (productId, token) =>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + productId,config)
    return response.data
}

const productService = {
    createProduct,
    getProducts,
    deleteProduct
}

export default productService