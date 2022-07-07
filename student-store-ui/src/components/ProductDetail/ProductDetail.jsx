import * as React from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import NotFound from "../NotFound/NotFound"
import ProductView from "../ProductView/ProductView"


export default function ProductDetail(props) {
  const [product, setProduct] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  let {productId} = useParams()
  const getProductQuantity = (productId) => {
    const item = props.shoppingCart.products.find((item) => item.itemId == productId)
    if (item) {
      return item.quantity
    }
    return 0
  }
  React.useEffect(() => {    
    axios.get(`https://codepath-store-api.herokuapp.com/store/${productId}`)
    .then((response) => { 
      setLoading(false)       
      if (response.data) {
        setProduct(response.data.product)
      } 
    })
    .catch(function (error) {
      console.log(error)
    });
  }, []);
  return (
    <div className="product-detail">
      {loading && <h1 className="loading">Loading...</h1>}
      {!loading && product ? <ProductView product={product} productId={product.id} quantity={getProductQuantity(product.id)} addItemToCart={props.addItemToCart} removeItemFromCart={props.removeItemFromCart}/>:<NotFound />}
    </div>
  )
}
