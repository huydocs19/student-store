import * as React from "react"
import Hero from "../Hero/Hero"
import ProductGrid from "../ProductGrid/ProductGrid"
import "./Home.css"

export default function Home(props) {
  return (
    <div className="home">
      <Hero/>
      <ProductGrid shoppingCart={props.shoppingCart} products={props.products} addItemToCart={props.handleAddItemToCart} removeItemFromCart={props.handleRemoveItemFromCart}/>
    </div>
  )
}
