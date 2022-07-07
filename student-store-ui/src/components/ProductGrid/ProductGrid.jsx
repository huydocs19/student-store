import * as React from "react"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductGrid(props) {
  return (
    <div className="product-grid">
      <div className="content">
      <h3>Best Selling Products</h3>
      <div className="grid">
        {props.products.map((item, idx) => (
          <ProductCard product={item} showDescription={false} key={idx}/>
        ))}
      </div>
      </div>
    </div>
  )
}