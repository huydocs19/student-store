import * as React from "react"
import CartTable from "../CartTable/CartTable"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import CartIcons from "../CartIcons/CartIcons"
import CheckoutInfo from "../CheckoutInfo/CheckoutInfo"
import "./ShoppingCart.css"

export default function ShoppingCart(props) {
  return (
    <div className="shopping-cart">
        {props.isOpen ?
          <div className="open">
            <h3>
                Shopping Cart <span className="button"><i className="material-icons md-48">add_shopping_cart</i></span>
            </h3>            
            {props.shoppingCart.products.length > 0 ? <CartTable products={props.products} shoppingCart={props.shoppingCart}/>: <div className="notification">No items added to cart yet. Start shopping now!</div>}
            <CheckoutForm error={props.error} checkoutForm={props.checkoutForm} onCheckoutFormChange={props.onCheckoutFormChange} onSubmitCheckoutForm={props.onSubmitCheckoutForm}/>
            <CheckoutInfo setError={props.setError} setIsOpen={props.setIsOpen} setReceiptLines={props.setReceiptLines} error={props.error} receiptLines={props.receiptLines}/>
          </div> : 
          <CartIcons setIsOpen={props.setIsOpen}/>
        }
        
    </div>
  )
}