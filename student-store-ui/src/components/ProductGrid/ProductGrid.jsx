import * as React from "react"
import ProductCard from "../ProductCard/ProductCard"

export default function ProductGrid(props) {
  const getProductQuantity = (productId) => {
    const item = props.shoppingCart.products.find((item) => item.itemId == productId)
    if (item) {
      return item.quantity
    }
    return 0
  }
  return (
    <div id="Buy" className="product-grid">
      <div className="content">
      <h3>Best Selling Products</h3>
      <div className="grid">
        {props.products.map((item, idx) => (         
          <ProductCard quantity={getProductQuantity(item.id)} product={item} showDescription={false} key={idx}/>
        ))}
      </div>
      </div>
    </div>
  )
}