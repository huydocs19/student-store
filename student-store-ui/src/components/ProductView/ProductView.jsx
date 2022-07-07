import * as React from "react"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductView() {
  return (
    <div className="product-view">
      <h1 className="product-id">Product #{productId}</h1>
      <div className="product-view-card">
      <ProductCard showDescription={true}/>
      </div>
      
    </div>
  )
}
