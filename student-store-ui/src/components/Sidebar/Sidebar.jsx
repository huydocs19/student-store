import * as React from "react"
import CartIcons from "../CartIcons/CartIcons"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import "./Sidebar.css"

export default function Sidebar(props) {
  return (
    <section className="sidebar">
      <div className="wrapper">
        <button className={`toggle-button button ${props.isOpen ? "open": "closed"}`} onClick={props.onToggle}>
          <i className="material-icons md-48">arrow_forward</i>
        </button>
        {props.isOpen?<ShoppingCart checkoutForm={props.checkoutForm} shoppingCart={props.shoppingCart} onCheckoutFormChange={props.onCheckoutFormChange} onSubmitCheckoutFrom={props.onSubmitCheckoutFrom}/>:<CartIcons />}
      </div>
    </section>
  )
}
