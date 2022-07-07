import * as React from "react"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductView(props) {
  return (
    <div className="product-view">
      <h1 className="product-id">Product #{props.productId}</h1>
      <div className="product-view-card">
      <ProductCard product={props.product} productId={props.productId} addItemToCart={props.addItemToCart} removeItemFromCart={props.removeItemFromCart} showDescription={true}/>
      </div>
      
    </div>
  )
}
