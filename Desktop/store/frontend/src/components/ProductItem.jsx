import {useDispatch} from 'react-redux'
import {deleteProduct} from '../features/products/productSlice'


function ProductItem({product}) {
  const  dispatch = useDispatch()
  return (
    <div className="product">
        <div>
            {new Date(product.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{product.text}</h2>
        <button onClick={()=>dispatch(deleteProduct(product._id))} className="close">X</button>
    </div>
  )
}

export default ProductItem