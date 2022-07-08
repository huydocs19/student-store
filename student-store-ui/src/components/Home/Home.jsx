import * as React from "react"

import ProductGrid from "../ProductGrid/ProductGrid"
import About from "../About/About"
import Contact from "../Contact/Contact"
import Footer from "../Footer/Footer"
import "./Home.css"

export default function Home(props) {
  return (
    <div className="home">      
      <ProductGrid error={props.error} isFetching={props.isFetching} shoppingCart={props.shoppingCart} products={props.products} addItemToCart={props.addItemToCart} removeItemFromCart={props.removeItemFromCart}/>
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
