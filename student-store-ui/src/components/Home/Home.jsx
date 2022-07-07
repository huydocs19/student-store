import * as React from "react"
import Hero from "../Hero/Hero"
import ProductGrid from "../ProductGrid/ProductGrid"
import About from "../About/About"
import Contact from "../Contact/Contact"
import "./Home.css"

export default function Home(props) {
  return (
    <div className="home">
      <Hero/>
      <ProductGrid shoppingCart={props.shoppingCart} products={props.products} addItemToCart={props.handleAddItemToCart} removeItemFromCart={props.handleRemoveItemFromCart}/>
      <About />
      <Contact />
      <div class="bottom"><span class="payment-options"><img src="/assets/american_express.40f242c7.svg" alt="american express"/><img src="/assets/mastercard.c75b7bc4.svg" alt="mastercard"/><img src="/assets/paypal.6a45b239.svg" alt="paypal"/><img src="/assets/visa.a818ddc4.svg" alt="visa"/></span></div>
    </div>
  )
}
