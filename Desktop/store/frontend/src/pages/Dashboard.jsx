import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Productform from '../components/Productform'
import Spinner from '../components/Spinner'
import {getProducts,reset} from '../features/products/productSlice'
import ProductItem from '../components/ProductItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state)=>state.auth)
  const {products,isLoading, isError,message} = useSelector((state)=>
    state.products)

useEffect(()=>{
  if(!isError){
    console.log(message)
  }

  if(!user){
    navigate('/login')
  }
  dispatch(getProducts())
  return () =>{
    dispatch(reset())
  }
},[user,navigate,isError,message,dispatch])

if(isLoading){
  return <Spinner/>
}

  return (
    <>
  <selection className="heading">
    <h1>Welcome {user && user.name}</h1>
    <p>Products Dashboard</p>
  </selection>

  <Productform/>
  <section className="container">
    {products.length > 0 ? (
      <div className="goals">
        {products.map((product) =>{
          <ProductItem key={product._id} product={product}/>
        })}
      </div>
    ):(<h3>No Product found</h3>)}
  </section>
    </>
  )
}

export default Dashboard
