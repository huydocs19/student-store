import * as React from "react"
import ProductCard from "../ProductCard/ProductCard"
import "./ProductGrid.css"

export default function ProductGrid(props) {
  const getProductQuantity = (productId) => {
  const item = props.shoppingCart?.products?.find((item) => item.itemId === productId)
    if (item) {
      return item.quantity
    }
    return 0
  }
  return (
    <div id="Buy" className="product-grid">
      <div className="content">
        <h3>Best Selling Products</h3>
        {props.isFetching ? 
          <div><p>No Products Availble</p></div> :
            props.error?.type === "NO_PRODUCTS_ERROR" ?
            <div><p>{props.error?.message}</p></div> :
            <div className="grid">
            {props.products.map((item, idx) => (         
              <ProductCard quantity={getProductQuantity(item.id)} product={item} showDescription={false} addItemToCart={props.addItemToCart} removeItemFromCart={props.removeItemFromCart} key={idx}/>
            ))}
        </div>
        }        
      </div>
    </div>
  )
}