import * as React from "react"
import {ProductCard} from "components"

export default function ProductView({product, quantity, addToCart, removeFromCart}) {
  return (
    <div className="product-view">
      <h1 className="product-id">Product #{product.id}</h1>
      <div className="product-view-card">
      <ProductCard 
        product={product} 
        quantity={quantity} 
        addToCart={() => addToCart(product)} 
        removeFromCart={() => removeFromCart(product)} 
        showDescription={true}
      />
      </div>
      
    </div>
  )
}
