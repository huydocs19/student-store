import { useState} from "react"
import apiClient from "../../services/apiClient"
import {Stars, StarsInput} from "components"
import {Link} from "react-router-dom"
import codepath from "../../assets/codepath.svg"
import { formatPrice } from "../../utils/format"
import "./ProductCard.css"


export default function ProductCard({ 
  user, 
  updateProduct, 
  product, 
  setProduct, 
  quantity, 
  addToCart, 
  removeFromCart, 
  showDescription 
}) {
  const [rating, setRating] = useState(null)
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [isSavingRating, setIsSavingRating] = useState(false)
  const fetchProduct = async () => {
    setIsFetching(true)

    const { data, error } = await apiClient.fetchProductById(product.id)
    if (error) {
      setError(error)      
    }
    if (data?.product?.rating) {
      const productUpdate = {rating: data.product.rating}
      setProduct(data.product)
      updateProduct({productId: product.id, productUpdate})      
    }
    setIsFetching(false)
  }
  const handleOnSaveRating = async () => {
    setIsSavingRating(true)      
    const { data, error } = await apiClient.createRatingForProduct({ productId: product.id, rating })
    if (data?.rating) {
      await fetchProduct(product.id)      
    }
    if (error) {
      setError(error)
    }

    setIsSavingRating(false)    
  }
  if (!product && !isFetching) return null
  if (!product ) return <h1>Loading...</h1>
  const userIsLoggedIn = Boolean(user?.email)

  return (
    <div className="product-card">
      <div className="media">
        {product.image ? <Link to={`/store/${product.id}`}><img src={product.image} alt="product cover" /></Link> : <Link to={`/store/${product.id}`}><img src={codepath} alt="product cover" /></Link>}
      </div>
      <div className="product-info">
        <div className="main-info">
          <p className="product-name">{product.name}</p>
          <Stars rating={product.rating || 0} max={5} />
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
        {showDescription ? (
          <div className="desc">
              <p className="product-description">{product.description}</p>
          </div>): null
        }                
        <div className="actions">
          <div className="buttons">
            <button className="add" onClick={addToCart}>
              <i className="material-icons">add</i>
            </button>
            <button className="remove">
              <i className="material-icons" onClick={removeFromCart}>remove</i>
            </button>
          </div>
          {quantity > 0 &&
            <span className="product-quantity">
              <span className="amt">{quantity}</span>
            </span>
          }
          
        </div>        
        
      </div>      
      {error && <span className="error">Error: {error}</span>}
      <div className="actions">
        {showDescription?          
            <div className="rate-product">
                <p>Rate this product</p>
                <StarsInput value={rating} setValue={setRating} max={5} />
                {userIsLoggedIn ? (
                  <button className="btn" onClick={handleOnSaveRating} disabled={!userIsLoggedIn}>
                    {isSavingRating ? "Loading..." : "Save Rating"}
                  </button>
                ) : (
                  <button className="btn is-disabled" disabled>
                    Sign In To Save Rating
                  </button>
                )}                
              </div>:
            null
          }
      </div>
    </div>
  )
}
