import * as React from "react"
import {ProductCard} from "components"

export default function ProductView({user, product, updateProduct, setProduct, quantity, addToCart, removeFromCart}) {
  return (
    <div className="product-view">
      <h1 className="product-id">Product #{product.id}</h1>
      <div className="product-view-card">
      <ProductCard 
        user = {user}
        product={product} 
        updateProduct={updateProduct}
        quantity={quantity}         
        setProduct={setProduct}
        addToCart={() => addToCart(product)} 
        removeFromCart={() => removeFromCart(product)} 
        showDescription={true}
      />
      </div>
      
    </div>
  )
}
