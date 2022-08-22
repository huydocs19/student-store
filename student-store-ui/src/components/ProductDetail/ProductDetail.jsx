import {useState, useEffect} from "react"
import apiClient from "../../services/apiClient"
import { useParams } from "react-router-dom"
import {NavBar, NotFound, ProductView} from "components"
import "./ProductDetail.css"

export default function ProductDetail({
  user,
  updateProduct,   
  addToCart,
  removeFromCart,
  getQuantityOfItemInCart,
  handleLogout,  
}) {
  const [product, setProduct] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)   
  let {productId} = useParams() 
  
  useEffect(() => {
    const fetchProduct = async () => {
      setIsFetching(true)      
      const {data, error} = await apiClient.fetchProductById(productId) 
      if (error) {
        setError(error)
      }
      if (data?.product) {       
        setProduct(data.product)                      
      } else {
        setError("Error fetching the product.")
      }
      setIsFetching(false)      
    } 
    fetchProduct()
  }, [productId]);
  return (
    <div className="product-detail">
      <NavBar user={user} handleLogout={handleLogout}/>       
      {isFetching ? 
          <div className="card">
            <p>Loading...</p>
          </div>:
        error ? <span className="error">Error: {error}</span>:
        product ?
        <ProductView 
          user={user}
          updateProduct={updateProduct}
          product={product} 
          setProduct={setProduct}
          quantity={getQuantityOfItemInCart(product)} 
          addToCart={addToCart} 
          removeFromCart={removeFromCart}
        />:
        <NotFound />
      }
    </div>
  )
}
