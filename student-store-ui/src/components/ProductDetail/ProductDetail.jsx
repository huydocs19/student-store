import * as React from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import NotFound from "../NotFound/NotFound"
import ProductView from "../ProductView/ProductView"
import "./ProductDetail.css"

export default function ProductDetail(props) {
  const [product, setProduct] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)  
  let {productId} = useParams()
  const getProductQuantity = (productId) => {
    const item = props.shoppingCart?.products?.find((item) => item.itemId == productId)    
    if (item) {      
      return item.quantity
    }   
    return 0
  }
  React.useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true) 
      axios.get(`http://localhost:3001/store/${productId}`)
      .then((response) => {             
        if (response?.data?.product) {
          setProduct(response.data.product)
        } 
        setIsLoading(false) 
      })
      .catch(function (error) {
        setIsLoading(false) 
      });
    } 
    fetchProduct()
  }, []);
  return (
    <div className="product-detail">
      {isLoading ? 
        <h1 className="loading">Loading...</h1>:
        product ?
        <ProductView product={product} productId={product.id} quantity={getProductQuantity(product.id)} addItemToCart={props.addItemToCart} removeItemFromCart={props.removeItemFromCart}/>:
        <NotFound />
      }
    </div>
  )
}
