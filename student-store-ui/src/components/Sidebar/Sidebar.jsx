import * as React from "react"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import "./Sidebar.css"

export default function Sidebar(props) {
  return (
    <section className={`sidebar ${props.isOpen ? "open": "closed"}`}>
      <div className="wrapper">
        <button className={`toggle-button button ${props.isOpen ? "open": "closed"}`} onClick={props.onToggle}>
          <i className="material-icons md-48">arrow_forward</i>
        </button>
        <ShoppingCart setError={props.setError} setIsOpen={props.setIsOpen} setReceiptLines={props.setReceiptLines} error={props.error} receiptLines={props.receiptLines} products={props.products} isOpen={props.isOpen} checkoutForm={props.checkoutForm} shoppingCart={props.shoppingCart} onCheckoutFormChange={props.onCheckoutFormChange} onSubmitCheckoutForm={props.onSubmitCheckoutForm}/>
      </div>
    </section>
  )
}
